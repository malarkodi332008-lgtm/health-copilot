from fastapi import APIRouter, HTTPException

from database import users_collection
from models.schemas import RegisterRequest, LoginRequest
from services.auth_service import hash_pin, verify_pin

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(payload: RegisterRequest):
    email = payload.email.lower().strip()

    existing = users_collection.find_one({"email": email})

    if existing:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists.",
        )

    user = {
        "name": payload.name.strip(),
        "age": payload.age,
        "mobile": payload.mobile.strip(),
        "email": email,
        "language": payload.language,
        "pin_hash": hash_pin(payload.pin),
    }

    result = users_collection.insert_one(user)

    return {
        "success": True,
        "user_id": str(result.inserted_id),
        "name": user["name"],
        "age": user["age"],
        "mobile": user["mobile"],
        "email": user["email"],
        "language": user["language"],
    }


@router.post("/login")
def login(payload: LoginRequest):
    email = payload.email.lower().strip()

    user = users_collection.find_one({"email": email})

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or PIN.",
        )

    if not verify_pin(
        payload.pin,
        user.get("pin_hash", ""),
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or PIN.",
        )

    return {
        "success": True,
        "user_id": str(user["_id"]),
        "name": user["name"],
        "age": user["age"],
        "mobile": user["mobile"],
        "email": user["email"],
        "language": user["language"],
    }