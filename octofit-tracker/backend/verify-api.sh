#!/bin/bash
# OctoFit Tracker API Verification Script

# Determine base URL based on Codespaces or localhost
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
else
    BASE_URL="http://localhost:8000"
fi

echo "🧪 OctoFit Tracker API Verification"
echo "======================================"
echo "Base URL: $BASE_URL"
echo ""

# Test health endpoint
echo "1️⃣  Testing Health Endpoint"
curl -s "$BASE_URL/api/health" | jq . || echo "❌ Health check failed"
echo ""

# Test get all users
echo "2️⃣  Testing GET /api/users"
curl -s "$BASE_URL/api/users" | jq . || echo "❌ Get users failed"
echo ""

# Test get all activities
echo "3️⃣  Testing GET /api/activities"
curl -s "$BASE_URL/api/activities" | jq . || echo "❌ Get activities failed"
echo ""

# Test get all teams
echo "4️⃣  Testing GET /api/teams"
curl -s "$BASE_URL/api/teams" | jq . || echo "❌ Get teams failed"
echo ""

# Test get leaderboard
echo "5️⃣  Testing GET /api/leaderboard"
curl -s "$BASE_URL/api/leaderboard" | jq . || echo "❌ Get leaderboard failed"
echo ""

# Test get workouts
echo "6️⃣  Testing GET /api/workouts"
curl -s "$BASE_URL/api/workouts" | jq . || echo "❌ Get workouts failed"
echo ""

echo "✅ Verification complete!"
