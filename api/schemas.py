"""
Pydantic schemas
"""
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Auth schemas
class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Host schemas
class HostBase(BaseModel):
    name: str
    ip_address: str
    tags: Optional[List[str]] = []


class HostCreate(HostBase):
    pass


class HostUpdate(BaseModel):
    name: Optional[str] = None
    ip_address: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[List[str]] = None


class HostResponse(HostBase):
    id: int
    status: str
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Item schemas
class ItemBase(BaseModel):
    key: str
    value_type: str = "numeric"


class ItemCreate(ItemBase):
    host_id: int


class ItemResponse(ItemBase):
    id: int
    host_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Metric schemas
class MetricCreate(BaseModel):
    host_id: int
    item_id: Optional[int] = None
    key: str
    value: float


class MetricResponse(BaseModel):
    id: int
    host_id: int
    key: str
    value: float
    timestamp: datetime

    class Config:
        from_attributes = True


# Alert schemas
class AlertBase(BaseModel):
    title: str
    message: str
    level: str = "info"


class AlertCreate(AlertBase):
    host_id: int


class AlertResponse(AlertBase):
    id: int
    host_id: int
    status: str
    triggered_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Trigger schemas
class TriggerBase(BaseModel):
    key: str
    condition: str
    threshold: float
    duration: int = 300
    alert_level: str = "warning"


class TriggerCreate(TriggerBase):
    host_id: int
    item_id: Optional[int] = None


class TriggerUpdate(BaseModel):
    condition: Optional[str] = None
    threshold: Optional[float] = None
    duration: Optional[int] = None
    enabled: Optional[bool] = None
    alert_level: Optional[str] = None


class TriggerResponse(TriggerBase):
    id: int
    host_id: int
    item_id: Optional[int]
    enabled: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
