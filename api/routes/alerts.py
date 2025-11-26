"""
Alerts routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from api.db.database import get_db
from api.db.models import Alert, Host, User
from api.schemas import AlertCreate, AlertResponse
from api.core.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[AlertResponse])
async def list_alerts(
    host_id: int = Query(None),
    status_filter: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List alerts"""
    query = db.query(Alert).join(Host).filter(Host.user_id == current_user.id)
    
    if host_id:
        query = query.filter(Alert.host_id == host_id)
    
    if status_filter:
        query = query.filter(Alert.status == status_filter)
    
    alerts = query.order_by(Alert.triggered_at.desc()).limit(100).all()
    
    return alerts


@router.post("/", response_model=AlertResponse)
async def create_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create alert"""
    # Verify host belongs to user
    host = db.query(Host).filter(
        Host.id == alert.host_id,
        Host.user_id == current_user.id
    ).first()
    
    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found"
        )
    
    new_alert = Alert(
        host_id=alert.host_id,
        title=alert.title,
        message=alert.message,
        level=alert.level,
        status="active"
    )
    
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    
    return new_alert
