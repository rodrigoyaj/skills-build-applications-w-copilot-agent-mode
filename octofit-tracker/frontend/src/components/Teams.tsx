import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

interface Team {
  _id: string
  name: string
  description?: string
  totalPoints: number
  members: Array<{
    _id: string
    name: string
    username: string
  }>
  createdBy?: {
    _id: string
    name: string
  }
}

interface ApiResponse {
  data: Team[]
  count: number
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const response = await fetchData<ApiResponse>(API_ENDPOINTS.teams)
        const data = Array.isArray(response) ? response : response.data || []
        setTeams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
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

  return (
    <div className="container py-5">
      <h1 className="mb-4">Teams</h1>
      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 {team.name}</h5>
                  {team.description && <p className="card-text text-muted small">{team.description}</p>}
                  
                  <div className="mb-3">
                    <p className="mb-2">
                      <strong>Total Points:</strong> <span className="badge bg-warning text-dark">{team.totalPoints}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Members:</strong> {team.members.length}
                    </p>
                  </div>

                  {team.members.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-sm">Team Members:</strong>
                      <ul className="list-unstyled small mt-2">
                        {team.members.map((member) => (
                          <li key={member._id} className="mb-1">
                            👤 {member.name} (@{member.username})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {team.createdBy && (
                    <small className="text-muted">Created by: {team.createdBy.name}</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
