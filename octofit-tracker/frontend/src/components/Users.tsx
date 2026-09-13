import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

interface User {
  _id: string
  name: string
  email: string
  username: string
  bio?: string
  totalPoints: number
  profilePicture?: string
}

interface ApiResponse {
  data: User[]
  count: number
}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const response = await fetchData<ApiResponse>(API_ENDPOINTS.users)
        const data = Array.isArray(response) ? response : response.data || []
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
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
      <h1 className="mb-4">Users</h1>
      {users.length === 0 ? (
        <div className="alert alert-info">No users found</div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text text-muted">@{user.username}</p>
                  {user.bio && <p className="card-text small">{user.bio}</p>}
                  <div className="mb-3">
                    <span className="badge bg-primary">Points: {user.totalPoints}</span>
                  </div>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
