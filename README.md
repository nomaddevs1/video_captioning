# Transcribro Project Documentation

Welcome to the Transcribro project documentation. This project consists of a client and a server component, each with its own setup, usage instructions, and development guidelines. Below you will find links to the specific documentation for each part of the project.

## Project Overview

Transcribro is an application designed to transcribe audio files into text, offering an intuitive interface for users to interact with their transcriptions. The project is divided into two main components:

- **Client**: A React-based frontend that provides the user interface.
- **Server**: A FastAPI-based backend responsible for processing audio files and managing transcriptions.

## Documentation Links

### [Client Documentation](./transcript-client/README.md)

For information on installing, running, and developing the client part of Transcribro, refer to the client documentation. This includes details on the project structure, usage instructions, and development guidelines.

### [Server Documentation](./server/README.md)

The server documentation provides instructions for setting up the server, running it, and adding new features. It also covers the API endpoints, environment configuration, and the overall architecture of the backend.

## Deployment

Transcribro uses modern cloud platforms for reliable and scalable deployment:

### Frontend (Vercel)
1. **Fork/Clone** this repository to your GitHub account
2. **Connect to Vercel**: Visit [vercel.com](https://vercel.com) and import your repository
3. **Select Project Root**: Choose `transcript-client` as your project directory
4. **Deploy**: Vercel will automatically detect React and deploy your frontend

### Backend (Railway)

1. **Connect to Railway**: Visit [railway.app](https://railway.app) and connect your GitHub repository
2. **Select Service**: Choose the `server` directory as your service root
3. **Set Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `APP_CLIENT_URL`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
4. **Deploy**: Railway will automatically build and deploy using the `railway.toml` configuration

The Railway configuration includes automatic installation of required system dependencies (Python, FFmpeg, wkhtmltopdf) and handles the build process seamlessly.

### Environment Variables
Make sure to set these environment variables in your backend deployment:
- `OPENAI_API_KEY`: Required for Whisper API access
- `APP_CLIENT_URL`: Frontend URL for CORS configuration
- `MODE`: Set to `PROD` for production (disables API docs)

## Contributing
 🚧🚧Still in progress🚧🚧

## Support

If you encounter any issues or have questions about the project, please file an issue on GitHub or contact the project maintainers directly.

Thank you for your interest in Transcribro. We look forward to your contributions and feedback.
