import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

interface LeaderboardEntry {
  _id: string
  rank: number
  points: number
  activitiesCount: number
  userId?: {
    _id: string
    name: string
    username: string
  }
  teamId?: {
    _id: string
    name: string
  }
}

interface ApiResponse {
  data: LeaderboardEntry[]
  count: number
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetchData<ApiResponse>(API_ENDPOINTS.leaderboard)
        const data = Array.isArray(response) ? response : response.data || []
        setLeaderboard(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    )
  }

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `${rank}.`
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">🏆 Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id} className={entry.rank <= 3 ? 'table-success' : ''}>
                  <td className="fw-bold">{getMedalEmoji(entry.rank)}</td>
                  <td>
                    <strong>{entry.userId?.name}</strong>
                    <br />
                    <small className="text-muted">@{entry.userId?.username}</small>
                  </td>
                  <td>{entry.teamId?.name || 'N/A'}</td>
                  <td>
                    <span className="badge bg-primary">{entry.points}</span>
                  </td>
                  <td>
                    <span className="badge bg-info">{entry.activitiesCount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
