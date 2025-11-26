"""
Netmon API - Main application
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.core.config import settings
from api.routes import auth, hosts, metrics, alerts, triggers
from api.db.database import engine
from api.db.models import Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Netmon API",
    description="Network monitoring API",
    version="0.1.0",
    openapi_url="/api/v1/openapi.json",
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(hosts.router, prefix="/api/v1/hosts", tags=["hosts"])
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["metrics"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["alerts"])
app.include_router(triggers.router, prefix="/api/v1/triggers", tags=["triggers"])


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


@app.get("/api/v1")
async def root():
    """API root"""
    return {"message": "Netmon API v1"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
