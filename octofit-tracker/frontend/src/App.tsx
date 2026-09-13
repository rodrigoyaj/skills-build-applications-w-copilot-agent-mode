import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <header className="mb-5">
          <h1>OctoFit Tracker</h1>
          <p>Your personal fitness tracking companion</p>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Track your activities, compete with teams, and achieve your fitness goals!</p>
    </div>
  )
}

export default App
