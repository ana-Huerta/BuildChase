
import createApiClient from './apiClient'

const base = import.meta.env.VITE_AUTH_API_URL

const authApi = createApiClient(`${base}api`)

export default authApi
