from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    username: str  # FastAPI OAuth2PasswordRequestForm uses 'username' field
    password: str

# Response schemas
class AuthResponse(BaseModel):
    user: UserResponse
    tokens: Token
