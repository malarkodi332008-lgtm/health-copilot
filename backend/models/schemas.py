from pydantic import BaseModel


class RegisterRequest(BaseModel):
    name: str
    age: int
    mobile: str
    email: str
    language: str
    pin: str


class LoginRequest(BaseModel):
    email: str
    pin: str


class UserResponse(BaseModel):
    user_id: str
    name: str
    age: int
    mobile: str
    email: str
    language: str