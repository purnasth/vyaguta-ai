"""
Vyaguta AI - FastAPI Backend Server

This module provides REST API endpoints for the Vyaguta AI chatbot.
It wraps the RAG pipeline and exposes it as HTTP endpoints.
"""

from datetime import datetime
from typing import List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from server.core.main import qa_chain, get_llm, OPENAI_API_KEY
from server.core.log_utils import debug_log


# --- Pydantic Models ---
class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []
    model: Optional[str] = "gpt-4.1-nano"


class ChatResponse(BaseModel):
    response: str
    timestamp: str
    sources: Optional[List[str]] = []


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str


class QuickQuestion(BaseModel):
    id: int
    question: str


class QuickQuestionsResponse(BaseModel):
    questions: List[QuickQuestion]


class SurpriseQuestionResponse(BaseModel):
    question: str


# --- Lifespan Event Handler ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    debug_log("FastAPI server starting up...")
    yield
    debug_log("FastAPI server shutting down...")


# --- FastAPI App ---
app = FastAPI(
    title="Vyaguta AI API",
    description="REST API for Vyaguta AI Chatbot - Your intelligent companion for Vyaguta onboarding & support",
    version="2.0.0",
    lifespan=lifespan,
)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Quick Questions Data ---
QUICK_QUESTIONS = [
    "What is Vyaguta?",
    "Contact person at leapfrog?",
    "Leapfrog Technology",
    "Company Calendar",
    "Lunch and snacks menu",
    "Speak-up Channels",
    "Brief all the Employee Benefits Nepal",
    "Leave types and guidelines Nepal",
    "JUMP Module",
    "LWOP",
    "Fill a worklog",
    "Employee Morale Survey",
    "Performance Appraisal Allowances",
    "Performance Improvement Plan (PIP)",
    "Team Outing Reimbursement Guidelines",
    "Promotions in Q3 2025",
    "Generate your Leapfrog Signature",
]

SURPRISE_QUESTIONS = [
    "How does the onboarding process work?",
    "What tools do employees use at Leapfrog?",
    "Who is Purna and Whose number is this +9779808021753?",
    "Explain in detail about the GAP.",
    "How to make a PR at Vyaguta?",
    "What are the different modules in Vyaguta?",
    "Describe in detail about the OKR module in Vyaguta.",
    "Describe in detail about the Pulse module in Vyaguta.",
    "Describe in detail about the Attendance module in Vyaguta.",
    "I want to take a leave, what are the types of leaves and how do i apply for that?",
    "How to install Vyaguta's Attendance module in my local machine?",
    "What are the tech tools used in Vyaguta?",
    "How do I report a bug in Vyaguta in Slack?",
    "Please provide me a template for requesting a feedback for quarter-end or mid evaluation.",
    "Describe in brief about the responsibility of a Senior Software Engineer, Development at leapfrog.",
    "Describe in detail procedure to mentor and train team members.",
    "How to fill up the worklog at Vyaguta?",
    "Describe in detail about the GAP.",
    "What are the Job Description for the role of Software Engineer, Development at leapfrog?",
    "What are the job description for DevOps Engineer at leapfrog?",
    "Who is Kailash Raj Bijayananda? How do I contact him?",
    "What is the process for General Leave Application and Approval Process?",
    "What are the brand guidelines for leapfrog?",
    "How can I identify 'Meets Expectations' of my team members? Explain in detail.",
    "How can we practice real-time feedback?",
]


def get_chat_response(
    question: str, history: List[Message] = None
) -> tuple[str, List[str]]:
    """
    Get response from the RAG chain with conversation history.

    Args:
        question: User's question
        history: Previous conversation messages

    Returns:
        Tuple of (response text, list of sources)
    """
    max_history = 3
    history_text = ""

    if history:
        # Build conversation context from history
        pairs = []
        temp_user = None
        for m in history:
            if m.role == "user":
                temp_user = m.content
            elif m.role == "assistant" and temp_user is not None:
                pairs.append((temp_user, m.content))
                temp_user = None

        for user_msg, assistant_msg in pairs[-max_history:]:
            history_text += f"User: {user_msg}\nAssistant: {assistant_msg}\n"

    # Build full query with context
    full_query = f"{history_text}User: {question}"

    debug_log(f"Processing query: {question[:50]}...")
    result = qa_chain.invoke({"query": full_query})

    answer = result["result"]

    # Extract sources
    source_docs = result.get("source_documents", [])
    sources = set()
    for doc in source_docs:
        meta = getattr(doc, "metadata", {})
        src = meta.get("source")
        if src:
            src_folder = src.split("/")[0]
            sources.add(src_folder)

    return answer, list(sources)


# --- API Endpoints ---
@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Check if the API is running and healthy."""
    return HealthResponse(
        status="healthy", timestamp=datetime.now().isoformat(), version="2.0.0"
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message and get a response from the AI assistant.

    - **message**: The user's question or message
    - **history**: Optional list of previous messages for context
    - **model**: Optional model selection (default: gpt-4.1-nano)
    """
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        response, sources = get_chat_response(request.message, request.history)

        return ChatResponse(
            response=response,
            timestamp=datetime.now().strftime("%H:%M"),
            sources=sources,
        )
    except Exception as e:
        debug_log(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error processing message: {str(e)}"
        )


@app.get("/api/quick-questions", response_model=QuickQuestionsResponse)
async def get_quick_questions():
    """Get list of predefined quick questions."""
    questions = [
        QuickQuestion(id=i + 1, question=q) for i, q in enumerate(QUICK_QUESTIONS)
    ]
    return QuickQuestionsResponse(questions=questions)


@app.get("/api/surprise", response_model=SurpriseQuestionResponse)
async def get_surprise_question(index: Optional[int] = None):
    """Get a random surprise question."""
    import random

    if index is not None:
        idx = index % len(SURPRISE_QUESTIONS)
    else:
        idx = random.randint(0, len(SURPRISE_QUESTIONS) - 1)

    return SurpriseQuestionResponse(question=SURPRISE_QUESTIONS[idx])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
