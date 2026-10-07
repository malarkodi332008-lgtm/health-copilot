import uuid
from pathlib import Path

from bson import ObjectId
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from database import (
    users_collection,
    documents_collection,
    lab_results_collection,
    medicines_collection,
    reports_collection,
    timeline_collection,
)
from services.ai_service import analyze_document

router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
}


@router.post("/upload")
async def upload_document(
    user_id: str = Form(...),
    document_type: str = Form(...),
    file: UploadFile = File(...),
):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID.",
        )

    user = users_collection.find_one(
        {"_id": ObjectId(user_id)}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, JPG and PNG files are supported.",
        )

    extension = Path(
        file.filename or ""
    ).suffix.lower()

    stored_name = f"{uuid.uuid4().hex}{extension}"
    file_path = UPLOAD_DIR / stored_name

    content = await file.read()

    with open(file_path, "wb") as output:
        output.write(content)

    document = {
        "user_id": ObjectId(user_id),
        "file_name": file.filename,
        "stored_name": stored_name,
        "file_path": str(file_path),
        "document_type": document_type,
        "content_type": file.content_type,
        "status": "uploaded",
    }

    result = documents_collection.insert_one(document)

    return {
        "success": True,
        "document_id": str(result.inserted_id),
        "file_name": file.filename,
        "status": "uploaded",
    }


@router.post("/{document_id}/analyze")
def analyze_uploaded_document(document_id: str):
    if not ObjectId.is_valid(document_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid document ID.",
        )

    document = documents_collection.find_one(
        {"_id": ObjectId(document_id)}
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    try:
        analysis = analyze_document(
            document["file_path"],
            document["document_type"],
        )

        documents_collection.update_one(
            {"_id": ObjectId(document_id)},
            {
                "$set": {
                    "status": "analyzed",
                    "summary": analysis.get("summary", ""),
                }
            },
        )

        user_id = document["user_id"]

        lab_results = analysis.get("lab_results", [])
        medicines = analysis.get("medicines", [])

        if lab_results:
            lab_results_collection.insert_many([
                {
                    "user_id": user_id,
                    "document_id": ObjectId(document_id),
                    **item,
                }
                for item in lab_results
            ])

        if medicines:
            medicines_collection.insert_many([
                {
                    "user_id": user_id,
                    "document_id": ObjectId(document_id),
                    **item,
                }
                for item in medicines
            ])

        reports_collection.insert_one({
            "user_id": user_id,
            "document_id": ObjectId(document_id),
            "name": document["file_name"],
            "type": document["document_type"],
            "status": "analyzed",
        })

        timeline_collection.insert_one({
            "user_id": user_id,
            "document_id": ObjectId(document_id),
            "event_type": "analysis",
            "title": "AI analysis completed",
            "description": "Document was analyzed successfully.",
        })

        return {
            "success": True,
            "document_id": document_id,
            "analysis": analysis,
        }

    except Exception as error:
        documents_collection.update_one(
            {"_id": ObjectId(document_id)},
            {
                "$set": {
                    "status": "failed",
                    "error": str(error),
                }
            },
        )

        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {error}",
        )