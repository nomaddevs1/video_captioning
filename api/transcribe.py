import logging
import traceback
import sys
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

logger.info("Starting transcribe module import...")

# Add the server directory to the path
server_path = os.path.join(os.path.dirname(__file__), '..', 'server')
logger.info(f"Adding server path: {server_path}")
logger.info(f"Server path exists: {os.path.exists(server_path)}")
sys.path.append(server_path)

try:
    from fastapi import FastAPI, UploadFile, status
    from fastapi.responses import JSONResponse, PlainTextResponse
    from fastapi.middleware.cors import CORSMiddleware
    from typing import Literal
    logger.info("FastAPI imports successful")
except Exception as e:
    logger.error(f"FastAPI import error: {e}")
    logger.error(traceback.format_exc())

try:
    from utils import duration_detector
    logger.info("duration_detector imported")
except Exception as e:
    logger.error(f"duration_detector import error: {e}")
    logger.error(traceback.format_exc())

try:
    from utils.generate_vtt import generate_vtt
    logger.info("generate_vtt imported")
except Exception as e:
    logger.error(f"generate_vtt import error: {e}")
    logger.error(traceback.format_exc())

try:
    from models.status import ErrorMessage
    logger.info("ErrorMessage imported")
except Exception as e:
    logger.error(f"ErrorMessage import error: {e}")
    logger.error(traceback.format_exc())

try:
    from models.web_vtt import WebVTTData
    logger.info("WebVTTData imported")
except Exception as e:
    logger.error(f"WebVTTData import error: {e}")
    logger.error(traceback.format_exc())

try:
    from transcriber.transcribe import transcribe_file, Transcript
    logger.info("transcriber modules imported")
except Exception as e:
    logger.error(f"transcriber import error: {e}")
    logger.error(traceback.format_exc())

logger.info("All import attempts completed")

# Create FastAPI app for this endpoint
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUDIO_FILE_BYTES_LIMIT = 25_000_000  # 25 MB
SUPPORTED_FILE_EXTENSIONS = ["mp3", "mp4", "mpeg", "mpga", "wav", "webm", "m4a"]

logger.info(f"App initialized with file size limit: {AUDIO_FILE_BYTES_LIMIT}")

@app.get("/")
def test_endpoint():
    logger.info("Test endpoint called")
    return {"message": "Transcribe endpoint is working", "status": "ready"}

@app.post("/")
async def transcribe_audio(
    audio_file: UploadFile, language: str, format: Literal["json", "vtt"] = "json"
):
    logger.info(f"=== TRANSCRIBE REQUEST START ===")
    logger.info(f"Received file: {audio_file.filename}")
    logger.info(f"Language: {language}")
    logger.info(f"Format: {format}")
    
    audio_filename = audio_file.filename
    file_extension = audio_filename.split(".")[-1]
    logger.info(f"File extension: {file_extension}")

    if file_extension not in SUPPORTED_FILE_EXTENSIONS:
        logger.warning(
            f"User uploaded a file with unsupported file extension '{file_extension}'."
        )
        return JSONResponse(
            ErrorMessage(
                error=f"unsupported file format {file_extension}"
            ).model_dump_json(),
            status.HTTP_400_BAD_REQUEST,
        )

    logger.info("Writing uploaded file to disk...")
    with open(audio_filename, "wb") as f:
        file_content = audio_file.file.read()
        logger.info(f"File size: {len(file_content)} bytes")
        f.write(file_content)

    logger.info("Opening file for transcription...")
    audio_file = open(audio_filename, "rb")
    try:
        logger.info(f"Beginning to transcribe audio file {audio_filename}")
        transcript = transcribe_file(audio_file, language, AUDIO_FILE_BYTES_LIMIT)
        logger.info(f"Successfully generated transcript data")
        logger.info(f"Transcript type: {type(transcript)}")
    except Exception as e:
        audio_file.close()
        os.remove(audio_filename)
        logger.error(f"Transcription error: {e}")
        logger.error(traceback.format_exc())
        return JSONResponse(
            ErrorMessage(error="error transcribing the file").model_dump_json(),
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    audio_file.close()
    os.remove(audio_filename)
    logger.info("File cleanup completed")

    if format == "json":
        logger.info("Returning JSON format")
        return transcript
    elif format == "vtt":
        logger.info("Converting to VTT format...")
        wvd = WebVTTData.from_transcript(transcript)
        vtt_content = generate_vtt(wvd)
        logger.info("VTT conversion completed")
        return PlainTextResponse(vtt_content, media_type="text/vtt")

# Vercel handler
handler = app

logger.info("Transcribe module loaded successfully")