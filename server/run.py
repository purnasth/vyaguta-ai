#!/usr/bin/env python3
"""
Run the Vyaguta AI FastAPI server.

Usage:
    python -m server.run
    # or
    python server/run.py
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "server.api:app", host="0.0.0.0", port=8000, reload=True, log_level="info"
    )
