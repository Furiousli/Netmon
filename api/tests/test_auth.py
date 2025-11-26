"""
Tests for authentication
"""
import pytest
from fastapi.testclient import TestClient
from api.main import app
from api.core.security import get_password_hash
from api.db.models import User
from api.db.database import SessionLocal

client = TestClient(app)


@pytest.fixture
def db():
    """Get database session"""
    return SessionLocal()


def test_register_user(db):
    """Test user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }
    )
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"


def test_login(db):
    """Test user login"""
    # Create user
    hashed_pwd = get_password_hash("password123")
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=hashed_pwd
    )
    db.add(user)
    db.commit()
    
    # Login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "testuser",
            "password": "password123"
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_invalid_login(db):
    """Test invalid login"""
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "nonexistent",
            "password": "wrongpass"
        }
    )
    assert response.status_code == 401
