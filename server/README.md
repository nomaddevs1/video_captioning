# server

## Table of Contents

- [server](#server)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Folder Structure](#folder-structure)
  - [Usage](#usage)
    - [Documentation](#documentation)
  - [Installation](#installation-fast-api)
  - [Environment Variables](#environment-variables)

## Introduction<a name="introduction"></a>

Our server is written in Fastapi with python.

## Folder Structure<a name="folder-structure"></a>

The project follows a specific folder structure to organize the codebase. Still Organizing the folder structure. Here's an overview of the main directories:

```
src
├── models
├── pdf_generator
├── tests
```
- `Models`: This contain the types models.
- `PDF_GENERATOR`: This contain the functionality for generating the pdf.
- `Test`: This contain the test suite for the server.py which would be divided in the future.

## Usage<a name="usage"></a>
`cd server`
`sudo apt update`
`sudo apt install -y ffmpeg wkhtmltopdf`
`pip install -f requirements.txt`


### Starting Up the App
`uvicorn server:app --reload`

### Testing

The server includes comprehensive test suites covering:

- **API endpoints** (`test_main.py`, `test_generate_vtt.py`)
- **Core transcription logic** (`test_transcriber.py`)
- **PDF generation** (`test_pdf_generator.py`)
- **Logging functionality** (`test_logger.py`)

#### Run Tests
```bash
# Run all tests
pytest -v

# Run with coverage
coverage run pytest -v
coverage report

# Run specific test file
pytest tests/test_main.py -v
```

#### Test Requirements
Tests require:
- `ffmpeg` (for audio processing)
- `wkhtmltopdf` (for PDF generation)
- OpenAI API key (mocked in tests)

#### Test Structure
- `tests/fixtures/` - Test data files (SRT responses, VTT examples)
- `common_fixtures.py` - Shared test fixtures and mocks
- Individual test files for each module

### Documentation

API docs are generated using Swagger. You can access the docs with the `/docs` endpoint.

### Fast API<a name="installation-fast-api"></a>

1. Open a new terminal tab
2. Move to the server now with `cd server/`
3. Install requirements packages on system `sudo apt update`
`sudo apt install -y ffmpeg wkhtmltopdf`
4. Install the packages with `pip install -f requirements.txt`
5. Setup the OpenAI env key with `export OPENAI_API_KEY='key will be here'`
6. Start the app with `uvicorn server:app --reload`
7. Test the app by going to http://localhost:8000

### Environment Variables<a name="environment-variables"></a>

#### Development
For local development, you can set these in your shell or create a `.env` file:

```bash
export OPENAI_API_KEY='your-openai-api-key-here'
export APP_CLIENT_URL='http://localhost:3000'
```

#### Production (Railway)
Set these environment variables in your Railway deployment:

KEY              | DEFAULT                 | DESCRIPTION
-----------------|-------------------------|-----------------------------------------------------------
`APP_ADDRESS`    | `0.0.0.0`               | Address to listen on (use 0.0.0.0 for cloud deployment)
`APP_PORT`       | `$PORT`                 | Port to listen on (automatically set by cloud platforms)
`APP_CLIENT_URL` | **Required**            | URL of your frontend (e.g., `https://your-app.vercel.app`)
`APP_LOG_FILE`   | `None`                  | Filepath to save rolling server logs to. If no value is given, logs are not saved to any file.
`OPENAI_API_KEY` | **Required**            | OpenAI API key used to interface with the Whisper model
`MODE`           | `DEV`                   | Mode of operation, in `PROD` (production) mode, endpoints like `/docs` and `/redoc` will be disabled

#### Required for Production:
- `OPENAI_API_KEY`: Get this from [OpenAI Platform](https://platform.openai.com/api-keys)
- `APP_CLIENT_URL`: Set to your Vercel frontend URL for CORS configuration
