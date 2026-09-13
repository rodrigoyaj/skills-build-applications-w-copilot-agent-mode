import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
}

interface Workout {
  _id: string
  name: string
  description?: string
  exercises: Exercise[]
  difficulty: string
  duration: number
  points: number
  userId?: {
    _id: string
    name: string
    username: string
  }
}

interface ApiResponse {
  data: Workout[]
  count: number
}

const difficultyBadgeColor: Record<string, string> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger'
}

const difficultyEmoji: Record<string, string> = {
  beginner: '🟢',
  intermediate: '🟡',
  advanced: '🔴'
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetchData<ApiResponse>(API_ENDPOINTS.workouts)
        const data = Array.isArray(response) ? response : response.data || []
        setWorkouts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
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
      <h1 className="mb-4">💪 Workout Plans</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts found</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                    <span
                      className={`badge bg-${difficultyBadgeColor[workout.difficulty] || 'secondary'}`}
                    >
                      {difficultyEmoji[workout.difficulty]} {workout.difficulty}
                    </span>
                  </div>

                  {workout.description && (
                    <p className="card-text text-muted small mb-3">{workout.description}</p>
                  )}

                  <div className="mb-3">
                    <p className="mb-2">
                      <strong className="text-sm">Duration:</strong> {workout.duration} min
                    </p>
                    <p className="mb-0">
                      <strong className="text-sm">Points:</strong>{' '}
                      <span className="badge bg-success">{workout.points}</span>
                    </p>
                  </div>

                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-sm d-block mb-2">Exercises:</strong>
                      <div className="list-group list-group-sm">
                        {workout.exercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="list-group-item list-group-item-light py-2"
                          >
                            <small>
                              <strong>{exercise.name}</strong>
                              <br />
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight && <> @ {exercise.weight} lbs</>}
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {workout.userId && (
                    <small className="text-muted">
                      Created by: {workout.userId.name}
                    </small>
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

export default Workouts
