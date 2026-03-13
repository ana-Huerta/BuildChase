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
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="center-card card" style={{ maxWidth: 420, width: '100%', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <img src="/images/logo-small.png" alt="BuildChaser" style={{ height: 36 }} onError={(e)=>{e.target.style.display='none'}} />
        </div>
        <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: 20, textAlign: 'center' }}>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} style={{ marginTop: 18, display: 'grid', gap: 10 }}>
          <input aria-label="email" className="input" placeholder="Correo electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input aria-label="password" className="input" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn" style={{ width: '100%', padding: '10px 12px' }}>Entrar</button>
          {error && <p style={{ color: 'var(--danger)', margin: 0, textAlign: 'center' }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}
