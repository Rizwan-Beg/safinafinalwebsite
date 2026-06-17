import os
import uuid
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

from prompts import SYSTEM_PROMPT, build_user_prompt

# Load env vars
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Google API key not found. Set it in .env file.")

# Initialize Google GenAI client
client = genai.Client(api_key=GOOGLE_API_KEY)

# FastAPI app
app = FastAPI(
    title="Safina Carpets Rug Placement API",
    description="Place rugs realistically in room images using Gemini",
    version="1.1"
)

import os

# Define allowed origins
allowed_origins = [
    "http://localhost:8090", 
    "http://localhost:3000"
]

# Add Vercel domain from environment variables if it exists
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Dynamic Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated images statically
app.mount("/images", StaticFiles(directory="."), name="images")

@app.get("/")
def root():
    return {"message": "Safina Carpets Rug Visualizer API is running. Use POST /place-rug/."}

@app.post("/place-rug/")
async def place_rug(
    room_image: UploadFile = File(...),
    rug_image: UploadFile = File(...),
    rug_width_ft: float | None = Form(None),
    rug_length_ft: float | None = Form(None),
    alignment_hint: str | None = Form(None),
    safety_style: str | None = Form(None),
):
    try:
        # Open uploaded images
        room = Image.open(room_image.file)
        rug = Image.open(rug_image.file)

        # Build dynamic user prompt
        user_prompt = build_user_prompt(
            rug_w_ft=rug_width_ft,
            rug_l_ft=rug_length_ft,
            alignment_hint=alignment_hint,
            safety_style=safety_style,
        )

        # Send request to Gemini using new SDK
        response = client.models.generate_content(
            model="gemini-3.1-flash-image",
            contents=[SYSTEM_PROMPT, user_prompt, rug, room],
        )

        # Extract generated image
        if hasattr(response, "parts") and response.parts:
            parts = response.parts
        elif hasattr(response, "candidates") and response.candidates:
            parts = response.candidates[0].content.parts
        else:
            return JSONResponse({"error": "No response parts from model"}, status_code=500)

        for part in parts:
            if part.inline_data is not None:
                if hasattr(part, "as_image"):
                    gen_img = part.as_image()
                else:
                    gen_img = Image.open(BytesIO(part.inline_data.data))

                # Save unique file
                filename = f"output_{uuid.uuid4().hex}.png"
                gen_img.save(filename)

                return JSONResponse({"image_url": f"http://127.0.0.1:8000/images/{filename}"})

        return JSONResponse({"error": "No image generated"}, status_code=500)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
