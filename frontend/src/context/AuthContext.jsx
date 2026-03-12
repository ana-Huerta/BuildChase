import React, { createContext, useContext, useEffect, useState } from 'react'
import createApiClient from '../services/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    // keep user in sync with localStorage
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  function saveToken(token) {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }

  function login({ token, user }) {
    saveToken(token)
    setUser(user || null)
  }

  function logout() {
    saveToken(null)
    setUser(null)
  }

  const authApi = createApiClient(import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3000')

  return (
    <AuthContext.Provider value={{ user, login, logout, authApi }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthContext
