#!/bin/bash
# Seed demo data

echo "🌱 Seeding demo data..."

# Create test hosts
curl -X POST http://localhost:8000/api/v1/hosts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "web-server-01",
    "ip_address": "192.168.1.10",
    "tags": ["production", "web"]
  }'

echo "✅ Demo data seeded"
