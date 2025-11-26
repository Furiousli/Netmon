"""
Hosts routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from api.db.database import get_db
from api.db.models import Host, User
from api.schemas import HostCreate, HostResponse, HostUpdate
from api.core.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[HostResponse])
async def list_hosts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all hosts for current user"""
    hosts = db.query(Host).filter(Host.user_id == current_user.id).all()
    return hosts


@router.post("/", response_model=HostResponse)
async def create_host(
    host: HostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new host"""
    db_host = db.query(Host).filter(Host.name == host.name).first()
    if db_host:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Host already exists",
        )
    
    new_host = Host(
        name=host.name,
        ip_address=host.ip_address,
        tags=host.tags,
        user_id=current_user.id,
        status="online"
    )
    
    db.add(new_host)
    db.commit()
    db.refresh(new_host)
    
    return new_host


@router.get("/{host_id}", response_model=HostResponse)
async def get_host(
    host_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get host by ID"""
    host = db.query(Host).filter(
        Host.id == host_id,
        Host.user_id == current_user.id
    ).first()
    
    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found"
        )
    
    return host


@router.patch("/{host_id}", response_model=HostResponse)
async def update_host(
    host_id: int,
    host_update: HostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update host"""
    host = db.query(Host).filter(
        Host.id == host_id,
        Host.user_id == current_user.id
    ).first()
    
    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found"
        )
    
    update_data = host_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(host, field, value)
    
    db.add(host)
    db.commit()
    db.refresh(host)
    
    return host


@router.delete("/{host_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_host(
    host_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete host"""
    host = db.query(Host).filter(
        Host.id == host_id,
        Host.user_id == current_user.id
    ).first()
    
    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found"
        )
    
    db.delete(host)
    db.commit()
    
    return None
