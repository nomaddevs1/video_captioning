import logging
import traceback
import sys
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

logger.info("=== INITIALIZING API INDEX ===")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the server directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'server'))

logger.info("Importing config...")
from config import (
    CLIENT_URL,
    HOST_URL,
    OPENAI_API_KEY,
    MODE,
    scrub_sensitive_environment_variables,
)

logger.info("Importing routes...")
from routes import pdf_route, transcribe_route, vtt_route, process_video_route
import openai

logger.info("Initializing OpenAI...")
# Initialize OpenAI
scrub_sensitive_environment_variables()
openai.api_key = OPENAI_API_KEY

logger.info("Creating FastAPI app...")
# Create FastAPI app
app = FastAPI(redoc_url=None, docs_url=None) if MODE == "PROD" else FastAPI()

logger.info("Adding CORS middleware...")
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Vercel deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

logger.info("Including routers...")
# Include routers
app.include_router(transcribe_route.router)
app.include_router(pdf_route.router)
app.include_router(vtt_route.router)
app.include_router(process_video_route.router)

@app.get("/")
def read_root():
    logger.info("Root endpoint called")
    return {"message": "Video Captioning API", "status": "running"}

@app.get("/health")
def health_check():
    logger.info("Health check called")
    return {
        "status": "healthy",
        "environment": dict(os.environ),
        "openai_configured": bool(openai.api_key),
        "mode": MODE,
        "openai_key_set": bool(os.environ.get('OPENAI_API_KEY'))
    }

# Export the app for Vercel
handler = app
logger.info("=== API INDEX INITIALIZATION COMPLETE ===")