"""
Database models
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON, Enum
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Host(Base):
    __tablename__ = "hosts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    ip_address = Column(String, index=True)
    status = Column(String, default="unknown")
    tags = Column(JSON, default=[])
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("hosts.id"), index=True)
    key = Column(String, index=True)
    value_type = Column(String, default="numeric")
    created_at = Column(DateTime, default=datetime.utcnow)


class Metric(Base):
    __tablename__ = "metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("hosts.id"), index=True)
    item_id = Column(Integer, ForeignKey("items.id"), index=True, nullable=True)
    key = Column(String, index=True)
    value = Column(Float)
    timestamp = Column(DateTime, index=True, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class AlertLevel(str, enum.Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"
    OK = "ok"


class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("hosts.id"), index=True)
    title = Column(String)
    message = Column(String)
    level = Column(String, default="info")
    status = Column(String, default="active")
    triggered_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class TriggerCondition(str, enum.Enum):
    GREATER_THAN = ">"
    LESS_THAN = "<"
    EQUAL = "=="
    NOT_EQUAL = "!="


class Trigger(Base):
    __tablename__ = "triggers"
    
    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("hosts.id"), index=True)
    item_id = Column(Integer, ForeignKey("items.id"), index=True, nullable=True)
    key = Column(String)
    condition = Column(String)
    threshold = Column(Float)
    duration = Column(Integer, default=300)
    enabled = Column(Boolean, default=True)
    alert_level = Column(String, default="warning")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
