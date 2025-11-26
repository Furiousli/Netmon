-- Netmon Database Initialization

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hosts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    status VARCHAR(50) DEFAULT 'unknown',
    tags JSONB DEFAULT '[]',
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    value_type VARCHAR(50) DEFAULT 'numeric',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    key VARCHAR(255) NOT NULL,
    value FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    level VARCHAR(50) DEFAULT 'info',
    status VARCHAR(50) DEFAULT 'active',
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS triggers (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    key VARCHAR(255) NOT NULL,
    condition VARCHAR(50) NOT NULL,
    threshold FLOAT NOT NULL,
    duration INTEGER DEFAULT 300,
    enabled BOOLEAN DEFAULT TRUE,
    alert_level VARCHAR(50) DEFAULT 'warning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_hosts_user_id ON hosts(user_id);
CREATE INDEX idx_metrics_host_id ON metrics(host_id);
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX idx_alerts_host_id ON alerts(host_id);
CREATE INDEX idx_triggers_host_id ON triggers(host_id);

-- Create default test user
INSERT INTO users (username, email, hashed_password, is_active)
VALUES ('demo', 'demo@netmon.local', '$2b$12$R9h7cIPz0gi.URNNX3kh2OPST9EKvCfGVWdwExAi72HfQC5D1EqNu', TRUE)
ON CONFLICT DO NOTHING;
