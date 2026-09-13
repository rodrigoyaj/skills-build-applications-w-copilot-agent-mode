import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import usersRouter from './routes/users.ts'
import teamsRouter from './routes/teams.ts'
import activitiesRouter from './routes/activities.ts'
import leaderboardRouter from './routes/leaderboard.ts'
import workoutsRouter from './routes/workouts.ts'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// Codespaces-aware API base URL
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    timestamp: new Date().toISOString(),
    baseUrl,
    environment: process.env.NODE_ENV || 'development'
  })
})

// API Routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 OctoFit Tracker API is running on port ${PORT}`)
  console.log(`📍 Base URL: ${baseUrl}`)
  console.log(`🗄️  MongoDB: ${MONGODB_URI}`)
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
})
