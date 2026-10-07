const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

async function request(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "API request failed."
    );
  }

  return data;
}


export async function registerUser(user) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}


export async function loginUser(email, pin) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      pin,
    }),
  });
}


export async function uploadDocument(
  userId,
  documentType,
  file
) {
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append(
    "document_type",
    documentType
  );
  formData.append("file", file);

  return request("/api/documents/upload", {
    method: "POST",
    body: formData,
  });
}


export async function analyzeDocument(
  documentId
) {
  return request(
    `/api/documents/${documentId}/analyze`,
    {
      method: "POST",
    }
  );
}


export async function getDashboard(userId) {
  return request(
    `/api/dashboard/${userId}`
  );
}


export async function getDocuments(userId) {
  return request(
    `/api/documents/${userId}`
  );
}


export async function checkBackend() {
  return request("/api/health");
}