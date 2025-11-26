#!/bin/bash
# Initialize Netmon development environment

echo "🚀 Initializing Netmon..."

# Check prerequisites
command -v docker &> /dev/null || { echo "❌ Docker is required but not installed."; exit 1; }
command -v docker-compose &> /dev/null || { echo "❌ Docker Compose is required but not installed."; exit 1; }

# Create .env files if they don't exist
if [ ! -f api/.env ]; then
    echo "📝 Creating api/.env from example..."
    cp api/.env.example api/.env
fi

# Start Docker Compose
echo "🐳 Starting Docker Compose services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Run database initialization
echo "🗄️  Initializing database..."
docker-compose exec -T api python init_db.py

# Create demo host (optional)
echo "✅ Netmon initialized successfully!"
echo ""
echo "🌐 Access points:"
echo "   Frontend: http://localhost:5173"
echo "   API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/api/v1/docs"
echo ""
echo "📝 Demo credentials:"
echo "   Username: demo"
echo "   Password: netmon123"
