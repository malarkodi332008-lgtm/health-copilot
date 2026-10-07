import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.auth import router as auth_router
from routers.documents import router as documents_router
from routers.dashboard import router as dashboard_router

load_dotenv()

app = FastAPI(
    title="AI Health Copilot API",
    version="1.0.0",
)

origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5176,http://127.0.0.1:5176",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(dashboard_router)

