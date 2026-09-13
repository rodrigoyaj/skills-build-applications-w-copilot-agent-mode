# OctoFit Tracker Backend API

Node.js + Express + TypeScript + MongoDB API for the OctoFit Tracker multi-tier application.

## Configuration

### Environment Variables

The API is configured to work with both Codespaces and localhost:

- **Port**: 8000
- **Codespaces URL**: `https://${CODESPACE_NAME}-8000.app.github.dev`
- **Localhost URL**: `http://localhost:8000`
- **MongoDB**: `mongodb://localhost:27017/octofit_db`

See `.env` file for configuration.

## Getting Started

### 1. Install Dependencies

```bash
cd octofit-tracker/backend
npm install
```

### 2. Seed the Database

```bash
npm run seed
```

This will populate the database with sample data:
- 5 users with different fitness profiles
- 3 teams with members
- 6 sample activities
- 5 leaderboard entries
- 3 workout plans

### 3. Start the API Server

```bash
npm run dev
```

The server will start on port 8000 and output:
```
🚀 OctoFit Tracker API is running on port 8000
📍 Base URL: http://localhost:8000 (or Codespaces URL if available)
🗄️  MongoDB: mongodb://localhost:27017/octofit_db
🔧 Environment: development
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health and configuration status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/team/:teamId` - Get team leaderboard
- `PUT /api/leaderboard/:id` - Update leaderboard entry

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Testing with curl

### Using the verification script (Linux/macOS/WSL)
```bash
bash verify-api.sh
```

### Manual curl commands

**Health Check**
```bash
curl http://localhost:8000/api/health
```

**Get All Users**
```bash
curl http://localhost:8000/api/users
```

**Get All Activities**
```bash
curl http://localhost:8000/api/activities
```

**Get All Teams**
```bash
curl http://localhost:8000/api/teams
```

**Get Leaderboard**
```bash
curl http://localhost:8000/api/leaderboard
```

**Get Workouts**
```bash
curl http://localhost:8000/api/workouts
```

## Build for Production

```bash
npm run build
npm start
```

The built files will be in the `dist/` directory.

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Main Express app
│   ├── models/            # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Team.ts
│   │   ├── Activity.ts
│   │   ├── Leaderboard.ts
│   │   └── Workout.ts
│   ├── routes/            # API route handlers
│   │   ├── users.ts
│   │   ├── teams.ts
│   │   ├── activities.ts
│   │   ├── leaderboard.ts
│   │   └── workouts.ts
│   └── scripts/
│       └── seed.ts        # Database seeding script
├── dist/                  # Compiled output (after build)
├── .env                   # Environment configuration
├── package.json
└── tsconfig.json
```

## Notes

- The API uses CORS to allow requests from the frontend (port 5173)
- All responses include error handling with appropriate HTTP status codes
- Database queries populate user and team references for better data context
- The API is automatically configured for Codespaces using the `CODESPACE_NAME` environment variable
