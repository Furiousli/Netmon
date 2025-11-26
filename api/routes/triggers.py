"""
Triggers routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from api.db.database import get_db
from api.db.models import Trigger, Host, User
from api.schemas import TriggerCreate, TriggerResponse, TriggerUpdate
from api.core.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[TriggerResponse])
async def list_triggers(
    host_id: int = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List triggers"""
    query = db.query(Trigger).join(Host).filter(Host.user_id == current_user.id)
    
    if host_id:
        query = query.filter(Trigger.host_id == host_id)
    
    triggers = query.all()
    
    return triggers


@router.post("/", response_model=TriggerResponse)
async def create_trigger(
    trigger: TriggerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create trigger"""
    # Verify host belongs to user
    host = db.query(Host).filter(
        Host.id == trigger.host_id,
        Host.user_id == current_user.id
    ).first()
    
    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found"
        )
    
    new_trigger = Trigger(
        host_id=trigger.host_id,
        item_id=trigger.item_id,
        key=trigger.key,
        condition=trigger.condition,
        threshold=trigger.threshold,
        duration=trigger.duration,
        alert_level=trigger.alert_level,
        enabled=True
    )
    
    db.add(new_trigger)
    db.commit()
    db.refresh(new_trigger)
    
    return new_trigger


@router.get("/{trigger_id}", response_model=TriggerResponse)
async def get_trigger(
    trigger_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get trigger by ID"""
    trigger = db.query(Trigger).join(Host).filter(
        Trigger.id == trigger_id,
        Host.user_id == current_user.id
    ).first()
    
    if not trigger:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trigger not found"
        )
    
    return trigger


@router.patch("/{trigger_id}", response_model=TriggerResponse)
async def update_trigger(
    trigger_id: int,
    trigger_update: TriggerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update trigger"""
    trigger = db.query(Trigger).join(Host).filter(
        Trigger.id == trigger_id,
        Host.user_id == current_user.id
    ).first()
    
    if not trigger:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trigger not found"
        )
    
    update_data = trigger_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(trigger, field, value)
    
    db.add(trigger)
    db.commit()
    db.refresh(trigger)
    
    return trigger
