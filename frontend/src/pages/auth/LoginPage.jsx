import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login, authApi } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await authApi.post('/auth/login', { email, password })
      const body = res.data && (res.data.data || res.data)
      const token = body.token || body?.token || res.data.token
      const user = body.user || body?.user || res.data.user
      if (!token) throw new Error('No token in response')
      login({ token, user })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="center-card card">
        <h1 style={{ color: 'var(--primary)', marginBottom: 6 }}>Iniciar sesión</h1>
        <p className="page-sub" style={{ marginTop: 0 }}>Accede con tu cuenta</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <input className="input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn">Entrar</button>
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}
