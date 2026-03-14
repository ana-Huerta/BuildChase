
import createApiClient from './apiClient'

const base = import.meta.env.VITE_GENSHIN_API_URL || 'http://localhost:3001'

const genshinApi = createApiClient(`${base}api`)

export default genshinApi
