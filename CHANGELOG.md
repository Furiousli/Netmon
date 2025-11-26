# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-26

### Added

#### Backend (API)
- feat/auth: JWT authentication with login & register endpoints
- feat/api: FastAPI framework with OpenAPI/Swagger documentation
- feat/db: PostgreSQL schema with 6 core tables (users, hosts, items, metrics, alerts, triggers)
- feat/hosts: CRUD endpoints for host management
- feat/metrics: Metrics ingestion endpoint with time-series storage
- feat/alerts: Alert creation and listing
- feat/triggers: Trigger management with condition & threshold support
- feat/security: Password hashing with bcrypt, JWT token management

#### Frontend (React + Vite)
- feat/ui: Core component library (KPI Card, Badge, Table, ChartCard, Button, Modal)
- feat/login: Authentication page with JWT token storage
- feat/dashboard: Main dashboard with host list and recent alerts
- feat/api-client: Axios instance with auth interceptors
- feat/design: TailwindCSS styling with design tokens
- feat/routing: Protected routes and navigation sidebar

#### Infrastructure
- feat/docker: Docker Compose with all services (API, Frontend, DB, Redis, Agent)
- feat/db: PostgreSQL initialization script with schema and default user
- feat/db: Table creation with proper indexes and relationships

#### Agent
- feat/agent: Python monitoring agent with heartbeat functionality
- feat/agent: Metrics collection (CPU, memory, disk, network)
- feat/agent: Host auto-registration

### Documentation
- docs: README with quick start guide
- docs: API endpoint documentation
- docs: Design system tokens in JSON format
- docs: Architecture overview
- docs: Configuration guide
- docs: Troubleshooting section

### Testing
- test/auth: Basic authentication tests
- ci: Tests ready for GitHub Actions integration

### Project Structure
- Monorepo setup with /api, /frontend, /agent, /infra, /docs
- .gitignore and project initialization
- Docker Compose production-ready configuration

### Default Credentials
- Demo user created: username=`demo`, password=`netmon123` (bcrypt hashed)

## [0.0.1] - Initial Setup

- Project initialization
- Repository structure created
