# Netmon - Network Monitoring MVP

A lightweight network monitoring solution for small to medium-sized infrastructures. Built with Python (FastAPI), PostgreSQL, Redis, and React.

## Features

- **Real-time monitoring**: Track host metrics in real-time
- **Alerts & Triggers**: Define thresholds and get notified
- **Responsive Dashboard**: Modern UI with TailwindCSS
- **Agent-based collection**: Python agent for metric collection
- **REST API**: Fully documented with Swagger/OpenAPI
- **Authentication**: JWT-based auth
- **Docker-ready**: Complete Docker Compose setup

## Quick Start

### Using Docker Compose (Recommended)

```bash
cd Netmon
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- API: http://localhost:8000/api/v1/docs

### Demo Credentials
- Username: `demo`
- Password: `netmon123`

## API Endpoints

All documented at `/api/v1/docs`

**Key endpoints:**
- `POST /api/v1/auth/login`
- `GET /api/v1/hosts`
- `POST /api/v1/metrics`
- `GET /api/v1/alerts`
- `POST /api/v1/triggers`

## Tech Stack

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + Vite + TailwindCSS
- **Message Queue**: Redis Streams
- **Agent**: Python
- **Containerization**: Docker Compose

## Database Schema

Tables: users, hosts, items, metrics, alerts, triggers

See `infra/init.sql` for complete schema.

## Development

### Backend
```bash
cd api
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Agent
```bash
cd agent
pip install -r requirements.txt
python agent.py
```

## Testing

```bash
cd api
pytest --cov tests/
```

## UI Design System

**Colors:**
- Primary: #00bfd3 (Cyan)
- Secondary: #1f2937
- Background: #0f172a
- Success: #10b981, Warning: #f59e0b, Danger: #ef4444

**Components:**
- KPI Card, Badge, Table, ChartCard, Button, Modal

## Project Status

✅ MVP Complete
- Core API with auth
- Database & migrations  
- Frontend dashboard
- Agent prototype
- Docker Compose setup
- Basic tests

**Next Steps:**
- Enhanced trigger system
- Webhook notifications
- Advanced metrics UI
- Performance optimizations
