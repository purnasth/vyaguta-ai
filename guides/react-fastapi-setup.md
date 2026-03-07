# React + FastAPI Setup Guide

This guide explains how to run Vyaguta AI with the modern React + TypeScript + Tailwind frontend and FastAPI backend.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                 React + TypeScript + Tailwind                    │
│                    (http://localhost:5173)                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FastAPI Server                              │
│                   (http://localhost:8000)                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  /api/chat   │  │  /api/health │  │ /api/surprise│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RAG Pipeline                                │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   ChromaDB   │  │  LangChain   │  │   OpenAI     │          │
│  │ Vector Store │  │ Orchestrator │  │    LLM       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

- Python 3.9+
- Node.js 18+ (LTS recommended)
- pnpm (`npm install -g pnpm`)
- OpenAI API key

## Backend Setup (FastAPI)

### 1. Create and activate virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-api-key-here
VYAGUTA_REFRESH_TOKEN=your-vyaguta-token
ENV=development
```

### 4. Start the FastAPI server

```bash
# Option 1: Using module syntax (recommended)
python -m server.run

# Option 2: Direct run
cd server && python run.py

# Option 3: Using uvicorn directly
uvicorn server.api:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

FastAPI provides automatic interactive documentation:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Frontend Setup (React + Vite)

### 1. Navigate to client directory

```bash
cd client
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

The UI will be available at `http://localhost:5173`

### 4. Build for production

```bash
pnpm build
```

Build output will be in `client/dist/`

## Development Workflow

### Running Both Servers

For development, you need both servers running:

**Terminal 1 - Backend:**

```bash
python -m server.run
```

**Terminal 2 - Frontend:**

```bash
cd client && pnpm dev
```

### API Proxy Configuration

The Vite dev server is configured to proxy API requests to the FastAPI backend. This is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

## Project Structure

### Frontend (`client/`)

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ChatContainer.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── WelcomeMessage.tsx
│   ├── services/
│   │   └── api.ts       # API client
│   ├── types/
│   │   └── index.ts     # TypeScript types
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles (Tailwind)
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### Backend (`server/`)

```
server/
├── __init__.py
├── api.py               # FastAPI application and endpoints
└── run.py               # Server runner script
```

## Customization

### Styling

The frontend uses Tailwind CSS. Key configuration files:

- `tailwind.config.js` - Tailwind configuration with custom colors and animations
- `src/index.css` - Global styles and custom CSS classes

### Colors

The theme uses custom Vyaguta colors defined in `tailwind.config.js`:

```javascript
colors: {
  vyaguta: {
    primary: '#3a8dff',
    secondary: '#ff75c2',
    dark: '#0f172a',
    darker: '#020617',
  }
}
```

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in your application

### Adding New API Endpoints

1. Add endpoint to `server/api.py`
2. Add corresponding method to `client/src/services/api.ts`
3. Add TypeScript types to `client/src/types/index.ts`

## Troubleshooting

### CORS Errors

If you see CORS errors, check that:

1. FastAPI server is running on port 8000
2. Frontend origin is in the CORS allow list in `server/api.py`

### API Connection Issues

1. Verify FastAPI server is running: `curl http://localhost:8000/api/health`
2. Check the Vite proxy configuration
3. Ensure no firewall is blocking the ports

### Build Errors

1. Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check Node.js version is 18+

## Production Deployment

### Backend

```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn server.api:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend

```bash
cd client
pnpm build
# Serve dist/ folder with your preferred static file server
```

### Docker (Optional)

Create a `Dockerfile` for containerized deployment:

```dockerfile
# Backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "server.api:app", "--host", "0.0.0.0", "--port", "8000"]
```
