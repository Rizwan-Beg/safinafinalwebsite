import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from langchain_core.messages import HumanMessage, AIMessage
from app.graph import build_graph
from app.ingest import build_index
from app.config import CORS_ORIGINS, PORT
import uvicorn

# Load environment variables from the .env file.
load_dotenv() 

app = FastAPI(title="Safina Carpets RAG Assistant", version="1.0.0")

# CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_graph()

# ---- Schemas ----
class ChatTurn(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    session_id: str
    message: str
    history: Optional[List[ChatTurn]] = []

class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, str]]

# ---- Routes ----
@app.get("/health")
def health():
    return {"status": "ok"}

# @app.post("/ingest")
# def ingest():
#     try:
#         build_index()
#         return {"status": "indexed"}
#     except SystemExit as e:
#         raise HTTPException(status_code=400, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    # Convert history to LangChain messages
    lc_history = []
    for t in (req.history or []):
        if t.role == "user":
            lc_history.append(HumanMessage(content=t.content))
        else:
            lc_history.append(AIMessage(content=t.content))

    # Append current user message
    lc_history.append(HumanMessage(content=req.message))

    state = {
        "session_id": req.session_id,
        "history": lc_history,
        "question": "",
        "context_docs": [],
        "answer": "",
        "sources": [],
    }
    result = graph.invoke(state)
    return ChatResponse(answer=result["answer"], sources=result["sources"])

# Corrected placement of the code block.
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)