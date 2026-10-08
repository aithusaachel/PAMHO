#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Building React frontend..."
cd courses-frontend
npm install
npm run build
cd ..

echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Running migrations..."
python manage.py migrate
