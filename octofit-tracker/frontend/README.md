# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## Configuration

### Codespaces Support

The frontend automatically detects when running in GitHub Codespaces and constructs the API URL accordingly:

- **In Codespaces**: `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`
- **On Localhost**: `http://localhost:8000`

### Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Codespaces name (if running in Codespaces):
   ```
   VITE_CODESPACE_NAME=your-codespace-name
   ```

If `VITE_CODESPACE_NAME` is not set or is "undefined", the frontend will automatically fall back to `http://localhost:8000`.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs:
- React 19
- Vite (fast bundler)
- React Router DOM (navigation)
- Bootstrap (styling)

### 2. Start Development Server

```bash
npm run dev
```

The frontend will start on **port 5173** and automatically connect to the backend API.

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Users.tsx        # Users list
│   │   ├── Teams.tsx        # Teams list
│   │   ├── Activities.tsx   # Activities feed
│   │   ├── Leaderboard.tsx  # Global leaderboard
│   │   └── Workouts.tsx     # Workout plans
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   ├── api.ts               # API configuration & utilities
│   ├── App.css
│   └── index.css
├── index.html               # HTML entry point
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js
└── tsconfig.json
```

## Features

- ✅ **React Router Navigation** - Multi-page SPA with navbar
- ✅ **Codespaces Integration** - Auto-detects Codespaces environment
- ✅ **Localhost Support** - Works for local development
- ✅ **Bootstrap Styling** - Responsive UI with Bootstrap
- ✅ **API Integration** - Connects to Express backend
- ✅ **Error Handling** - Graceful error messages
- ✅ **Loading States** - Spinners while fetching data
- ✅ **Responsive Design** - Mobile-friendly layouts

## API Integration

The app connects to the following endpoints:

- `GET /api/health` - Health check and configuration status
- `GET /api/users` - All users
- `GET /api/teams` - All teams
- `GET /api/activities` - All activities
- `GET /api/leaderboard` - Global leaderboard
- `GET /api/workouts` - All workouts

All requests automatically use the correct base URL based on environment.

## Troubleshooting

### "Cannot connect to API"
1. Check that the backend is running on port 8000
2. Verify `VITE_CODESPACE_NAME` is set correctly in `.env.local` (if using Codespaces)
3. Check browser console for specific error messages

### Environment Variables Not Loading
- Make sure you've created `.env.local` (not `.env`)
- Restart the dev server after changing `.env.local`
- Vite prefix requires all variables to start with `VITE_`

## Pages

- **Home** - Dashboard with API status
- **Users** - Browse all registered users
- **Teams** - View teams and members
- **Activities** - Recent activities feed
- **Leaderboard** - Global ranking by points
- **Workouts** - Available workout plans

## Styling

Uses Bootstrap 5 for responsive styling and common UI components. Custom CSS in `App.css` and `index.css` for additional styling.
