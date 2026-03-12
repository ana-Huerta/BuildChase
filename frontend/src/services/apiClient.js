import axios from 'axios'

function getToken() {
  return localStorage.getItem('token') || localStorage.getItem('authToken') || null
}

export default function createApiClient(baseURL) {
  const client = axios.create({ baseURL })

  client.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => Promise.reject(error)
  )

  return client
}
