import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

interface Activity {
  _id: string
  type: string
  title: string
  description?: string
  duration: number
  distance?: number
  calories?: number
  points: number
  date: string
  userId?: {
    _id: string
    name: string
    username: string
  }
}

interface ApiResponse {
  data: Activity[]
  count: number
}

const activityIcons: Record<string, string> = {
  running: '🏃',
  cycling: '🚴',
  swimming: '🏊',
  gym: '💪',
  hiking: '⛰️',
  yoga: '🧘',
  walking: '🚶',
  other: '⚽'
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const response = await fetchData<ApiResponse>(API_ENDPOINTS.activities)
        const data = Array.isArray(response) ? response : response.data || []
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
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
      <h1 className="mb-4">Activities</h1>
      {activities.length === 0 ? (
        <div className="alert alert-info">No activities found</div>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">
                    {activityIcons[activity.type] || '⚽'} {activity.title}
                  </h5>
                  {activity.description && <p className="mb-2 text-muted">{activity.description}</p>}
                  <div className="mb-2">
                    <small className="text-muted">
                      {activity.userId?.name} (@{activity.userId?.username})
                    </small>
                  </div>
                  <div>
                    {activity.duration && (
                      <span className="badge bg-info me-2">⏱️ {activity.duration} min</span>
                    )}
                    {activity.distance && (
                      <span className="badge bg-info me-2">📏 {activity.distance} km</span>
                    )}
                    {activity.calories && (
                      <span className="badge bg-warning me-2">🔥 {activity.calories} cal</span>
                    )}
                    <span className="badge bg-success">⭐ {activity.points} pts</span>
                  </div>
                </div>
                <small className="text-muted">{new Date(activity.date).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activities
