import os
from pathlib import Path
from typing import List

from google import genai
from pydantic import BaseModel, Field


class LabResult(BaseModel):
    test_name: str
    value: str
    unit: str
    status: str = Field(
        description="Describe the result neutrally, such as normal, high, low, or unclear."
    )


class Medicine(BaseModel):
    name: str
    dose: str
    frequency: str
    timing: str


class HealthAnalysis(BaseModel):
    summary: str
    lab_results: List[LabResult]
    medicines: List[Medicine]
    key_findings: List[str]
    follow_up_questions: List[str]
    disclaimer: str


def analyze_document(file_path: str, document_type: str):
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv(
        "AI_MODEL",
        "gemini-3.8-flash"
    )

    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is missing from backend/.env"
        )

    client = genai.Client(api_key=api_key)

    path = Path(file_path)

    uploaded_file = client.files.upload(
        file=path
    )

    prompt = f"""
You are a health-document information extraction assistant.

Document type:
{document_type}

Read the uploaded medical document and extract information that is explicitly
present in the document.

Return:
1. A concise summary of what the document contains.
2. Laboratory test results with value and unit when present.
3. Medicines explicitly mentioned, including dose/frequency/timing when present.
4. Key findings stated in the document.
5. Useful questions the patient could discuss with a qualified healthcare professional.

Do NOT diagnose diseases.
Do NOT infer cancer, tumor, or other medical conditions unless the document
explicitly states a clinician's diagnosis, and even then report it as
"documented diagnosis" rather than presenting your own diagnosis.

Do not invent missing values.
Use "Not stated" when information is absent.

This is for a health-information prototype and is not a substitute for
professional medical advice.
"""

    response = client.models.generate_content(
        model=model_name,
        contents=[
            prompt,
            uploaded_file,
        ],
        config={
            "response_mime_type": "application/json",
            "response_schema": HealthAnalysis,
        },
    )

    if response.parsed is not None:
        result = response.parsed
    else:
        result = HealthAnalysis.model_validate_json(
            response.text
        )

    return {
        "status": "completed",
        **result.model_dump(),
    }