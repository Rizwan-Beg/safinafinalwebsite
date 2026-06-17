from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_groq import ChatGroq
from app.vector import as_retriever
from app.prompts import SYSTEM_PROMPT, CONDENSE_QUESTION_PROMPT, ANSWER_PROMPT
from app.config import GROQ_API_KEY, LLM_MODEL

# ---- State ----
class ChatState(TypedDict):
    session_id: str
    history: List[Any]       # list[AIMessage|HumanMessage]
    question: str
    context_docs: List[Any]
    answer: str
    sources: List[Dict[str, str]]

# ---- Services ----
llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name=LLM_MODEL,
    temperature=0.2,
    max_tokens=900,
)

retriever = as_retriever(k=4)

# ---- Nodes ----
def condense_question(state: ChatState):
    # Find latest user message
    latest_user = ""
    for m in reversed(state["history"]):
        if isinstance(m, HumanMessage):
            latest_user = m.content
            break

    condense = llm.invoke([
        SystemMessage(content=CONDENSE_QUESTION_PROMPT),
        HumanMessage(content=f"History: {[{'role': 'user' if isinstance(x, HumanMessage) else 'assistant', 'content': x.content[:200]} for x in state['history']][-6:]}\n\nLatest: {latest_user}")
    ])
    return {"question": condense.content.strip() or latest_user}

def retrieve(state: ChatState):
    docs = retriever.invoke(state["question"])
    sources = []
    for d in docs[:3]:
        fname = d.metadata.get("source", "unknown").split("/")[-1]
        page = d.metadata.get("page", None)
        sources.append({"file": fname, "page": str(page) if page is not None else "n/a"})
    return {"context_docs": docs, "sources": sources}

def answer(state: ChatState):
    ctx = "\n\n".join([f"[{i+1}] {d.page_content}" for i, d in enumerate(state["context_docs"])])
    prompt = ANSWER_PROMPT.format(context=ctx, question=state["question"])
    resp = llm.invoke([
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=prompt)
    ])
    return {"answer": resp.content}

def build_graph():
    g = StateGraph(ChatState)
    g.add_node("condense_question", condense_question)
    g.add_node("retrieve", retrieve)
    g.add_node("answer", answer)

    g.set_entry_point("condense_question")
    g.add_edge("condense_question", "retrieve")
    g.add_edge("retrieve", "answer")
    g.add_edge("answer", END)
    return g.compile()
