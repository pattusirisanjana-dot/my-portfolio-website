import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
DATABASE_NAME = os.getenv("DATABASE_NAME", "sanjana_portfolio").strip()
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173").strip()
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "").strip()