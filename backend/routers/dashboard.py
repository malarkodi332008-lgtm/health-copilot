from bson import ObjectId
from fastapi import APIRouter, HTTPException

from database import (
    client,
    users_collection,
    lab_results_collection,
    medicines_collection,
    reports_collection,
    timeline_collection,
)

router = APIRouter(
    prefix="/api",
    tags=["Dashboard"],
)


def clean(items):
    output = []

    for item in items:
        item["_id"] = str(item["_id"])

        if "user_id" in item:
            item["user_id"] = str(item["user_id"])

        if "document_id" in item:
            item["document_id"] = str(
                item["document_id"]
            )

        output.append(item)

    return output


@router.get("/health")
def health():
    try:
        client.admin.command("ping")

        return {
            "success": True,
            "api": "running",
            "mongodb": "connected",
        }

    except Exception as error:
        return {
            "success": True,
            "api": "running",
            "mongodb": "demo/local",
            "detail": str(error),
        }


@router.get("/dashboard/{user_id}")
def dashboard(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID.",
        )

    uid = ObjectId(user_id)

    user = users_collection.find_one(
        {"_id": uid}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "success": True,
        "user": {
            "user_id": str(user["_id"]),
            "name": user["name"],
            "age": user["age"],
            "mobile": user["mobile"],
            "email": user["email"],
            "language": user["language"],
        },
        "lab_results": clean(
            list(lab_results_collection.find(
                {"user_id": uid}
            ))
        ),
        "medicines": clean(
            list(medicines_collection.find(
                {"user_id": uid}
            ))
        ),
        "reports": clean(
            list(reports_collection.find(
                {"user_id": uid}
            ))
        ),
        "timeline": clean(
            list(timeline_collection.find(
                {"user_id": uid}
            ))
        ),
    }