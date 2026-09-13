import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import { API_ENDPOINTS, fetchData } from './api'

interface HealthResponse {
  status: string
  baseUrl: string
  environment: string
}

function App() {
  const [apiStatus, setApiStatus] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await fetchData<HealthResponse>(API_ENDPOINTS.health)
        setApiStatus(data)
      } catch (error) {
        console.error('Failed to connect to API:', error)
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage apiStatus={apiStatus} loading={loading} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p>&copy; 2026 OctoFit Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

function HomePage({ apiStatus, loading }: { apiStatus: HealthResponse | null; loading: boolean }) {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4">Welcome to OctoFit Tracker</h1>
          <p className="lead">Track your fitness activities, compete with teams, and achieve your goals!</p>
          <div className="btn-group gap-2" role="group">
            <Link to="/users" className="btn btn-primary">
              View Users
            </Link>
            <Link to="/activities" className="btn btn-success">
              Log Activity
            </Link>
            <Link to="/leaderboard" className="btn btn-info">
              See Rankings
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">API Status</h5>
              {loading ? (
                <p className="text-muted">Checking API connection...</p>
              ) : apiStatus ? (
                <>
                  <p className="mb-2">
                    <strong>Status:</strong> <span className="badge bg-success">{apiStatus.status}</span>
                  </p>
                  <p className="mb-2">
                    <strong>Base URL:</strong> <code>{apiStatus.baseUrl}</code>
                  </p>
                  <p className="mb-0">
                    <strong>Environment:</strong> <span className="badge bg-info">{apiStatus.environment}</span>
                  </p>
                </>
              ) : (
                <p className="text-danger">Failed to connect to API</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

