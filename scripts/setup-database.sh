#!/bin/bash

# Time2Crack Database Setup Script
# This script creates the database and runs migrations

echo "🚀 Setting up Time2Crack database..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   On macOS: brew services start postgresql"
    echo "   On Linux: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "📦 Creating database 'time2crack'..."
psql -h localhost -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'time2crack'" | grep -q 1 || psql -h localhost -U postgres -d postgres -c "CREATE DATABASE time2crack;"

if [ $? -eq 0 ]; then
    echo "✅ Database 'time2crack' created successfully"
else
    echo "❌ Failed to create database. Please check your PostgreSQL credentials."
    echo "   Make sure you can connect with: psql -h localhost -U postgres -d postgres"
    exit 1
fi

# Run migrations
echo "🔄 Running database migrations..."
npm run migration:run

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo "🎉 You can now start the application with: npm run start:dev"
else
    echo "❌ Migration failed. Please check the error messages above."
    exit 1
fi 