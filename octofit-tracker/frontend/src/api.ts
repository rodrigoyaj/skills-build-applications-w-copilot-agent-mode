/**
 * API Configuration with Codespaces support
 * Uses VITE_CODESPACE_NAME environment variable
 */

const getApiBaseUrl = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  // Fallback to localhost for development
  return 'http://localhost:8000'
}

export const API_BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  workouts: `${API_BASE_URL}/api/workouts`,
  health: `${API_BASE_URL}/api/health`,
}

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
