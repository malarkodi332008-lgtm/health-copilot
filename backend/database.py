import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "health_copilot")

USE_DEMO_DB = False

try:
    if not MONGODB_URI:
        raise RuntimeError("MONGODB_URI is missing")

    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
    )

    client.admin.command("ping")

    db = client[DB_NAME]

    print("MongoDB Atlas connected successfully!")

except Exception as error:
    print("MongoDB Atlas unavailable.")
    print("Using local demo database instead.")
    print("Reason:", error)

    import mongomock

    client = mongomock.MongoClient()
    db = client[DB_NAME]
    USE_DEMO_DB = True


users_collection = db["users"]
documents_collection = db["documents"]
lab_results_collection = db["lab_results"]
medicines_collection = db["medicines"]
reports_collection = db["reports"]
timeline_collection = db["timeline"]

try:
    users_collection.create_index(
        "email",
        unique=True,
    )
except Exception:
    pass