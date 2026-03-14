
import createApiClient from './apiClient'

const base = import.meta.env.VITE_UMAMUSUME_API_URL || 'http://localhost:3003'

const umamusumeApi = createApiClient(`${base}api`)

export default umamusumeApi
