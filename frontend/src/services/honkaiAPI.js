
import createApiClient from './apiClient'

const base = import.meta.env.VITE_HONKAI_API_URL || 'http://localhost:3002/'

const honkaiApi = createApiClient(`${base}api`)

export default honkaiApi
