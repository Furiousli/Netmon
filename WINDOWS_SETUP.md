# Netmon - Windows Setup Guide

## Prerequisites

Ensure you have the following installed:
- Docker Desktop (with Docker Compose) - https://www.docker.com/products/docker-desktop
- Git for Windows - https://git-scm.com/download/win
- Python 3.11+ (optional, for local development)
- Node.js 20+ (optional, for local frontend development)

## Quick Start with Docker Compose

### Step 1: Clone/Navigate to Project
```powershell
cd S:\Projet\Netmon
```

### Step 2: Start Services
```powershell
docker-compose up --build
```

First run takes 2-3 minutes to build images and initialize database.

### Step 3: Access Services

Once "api | Application startup complete" appears in logs:

- **Frontend**: http://localhost:5173
- **API Swagger Docs**: http://localhost:8000/api/v1/docs
- **API Root**: http://localhost:8000/api/v1

### Step 4: Login

**Demo Account:**
- Username: `demo`
- Password: `netmon123`

## Local Development Setup

### Backend (FastAPI)

```powershell
# Navigate to API folder
cd api

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env file from example (if using local DB)
Copy-Item .env.example .env

# Initialize database
python init_db.py

# Start server (requires local PostgreSQL/Redis)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: http://localhost:8000

### Frontend (React)

```powershell
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

### Agent (Python)

```powershell
# Navigate to agent folder
cd agent

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Set environment variables
$env:API_URL = "http://localhost:8000/api/v1"
$env:API_TOKEN = "demo-token"
$env:HOST_NAME = "agent-host"

# Start agent
python agent.py
```

Agent will start sending heartbeats to http://localhost:8000/api/v1/metrics

## Docker Compose Commands

### View Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f agent
```

### Stop Services
```powershell
docker-compose down
```

### Reset Database (Delete all data)
```powershell
docker-compose down -v
docker-compose up --build
```

### Rebuild Specific Service
```powershell
docker-compose up -d --build api
```

## API Testing

### Using PowerShell/curl

#### Register User
```powershell
$headers = @{"Content-Type" = "application/json"}
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

curl -X POST http://localhost:8000/api/v1/auth/register `
  -Headers $headers `
  -Body $body
```

#### Login
```powershell
$headers = @{"Content-Type" = "application/json"}
$body = @{
    username = "demo"
    password = "netmon123"
} | ConvertTo-Json

$response = curl -X POST http://localhost:8000/api/v1/auth/login `
  -Headers $headers `
  -Body $body

# Extract token
$token = ($response | ConvertFrom-Json).access_token
```

#### Create Host
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = @{
    name = "web-server-01"
    ip_address = "192.168.1.10"
    tags = @("production", "web")
} | ConvertTo-Json

curl -X POST http://localhost:8000/api/v1/hosts `
  -Headers $headers `
  -Body $body
```

#### Create Metric
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = @{
    host_id = 1
    key = "cpu_usage"
    value = 45.5
} | ConvertTo-Json

curl -X POST http://localhost:8000/api/v1/metrics `
  -Headers $headers `
  -Body $body
```

#### List Metrics
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

curl -X GET "http://localhost:8000/api/v1/metrics?host_id=1" `
  -Headers $headers
```

## Troubleshooting

### Port Already in Use

If port 5173, 8000, 5432, or 6379 is already in use:

```powershell
# Find process using port
Get-NetTCPConnection -LocalPort 8000

# Kill process
Stop-Process -Id <PID> -Force
```

Or modify ports in `docker-compose.yml`

### Database Connection Error

```powershell
# Check if PostgreSQL service is running
docker-compose ps

# Reinitialize database
docker-compose down -v
docker-compose up --build
```

### Frontend can't connect to API

- Check that API is running: http://localhost:8000/health
- Verify API URL in frontend proxy: `frontend/vite.config.js`
- Check browser console for CORS errors
- Ensure CORS is enabled in API: `api/main.py`

### Agent not sending metrics

```powershell
# Check agent logs
docker-compose logs agent

# Verify host is created
curl -X GET http://localhost:8000/api/v1/hosts `
  -Headers @{"Authorization" = "Bearer <token>"}

# Check API token in docker-compose.yml
```

## File Structure

```
Netmon/
├── api/                 # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   ├── routes/          # API endpoints
│   ├── db/              # Database models
│   ├── core/            # Config & security
│   └── tests/           # Unit tests
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── pages/       # Page components
│   │   └── components.jsx
│   └── package.json
├── agent/               # Python agent
│   └── agent.py
├── infra/               # Infrastructure
│   └── init.sql         # Database schema
├── docker-compose.yml   # Container orchestration
└── README.md
```

## Next Steps

1. **Create Hosts**: Add your servers/services to monitor
2. **Configure Triggers**: Set up threshold alerts
3. **Monitor Metrics**: Check dashboard for real-time data
4. **Manage Alerts**: Review and acknowledge alerts
5. **Customize**: Modify UI colors, agent metrics, etc.

## Getting Help

- Check logs: `docker-compose logs -f`
- Review API docs: http://localhost:8000/api/v1/docs
- See main README: `README.md`
- Check implementation details: `IMPLEMENTATION.md`

## Performance Notes

- Dashboard refreshes every 10 seconds
- Agent sends heartbeat every 60 seconds (configurable)
- Metrics stored indefinitely (consider archiving in production)
- PostgreSQL can handle millions of metrics with proper indexing

## Security Notes

**For Development Only:**
- Default credentials are hardcoded
- Secret key is exposed in examples
- CORS allows all origins

**For Production:**
- Change SECRET_KEY in .env
- Use strong passwords
- Restrict CORS to specific domains
- Enable HTTPS/TLS
- Use environment variables for secrets
- Enable database backups
- Monitor agent connectivity
