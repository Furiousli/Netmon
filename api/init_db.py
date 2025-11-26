"""
Database initialization script
"""
from api.db.database import engine
from api.db.models import Base

def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")

if __name__ == "__main__":
    init_db()
