import React from 'react'

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="center-card card">
        <h1 style={{ color: 'var(--primary)', marginBottom: 6 }}>Iniciar sesión</h1>
        <p className="page-sub" style={{ marginTop: 0 }}>Accede con tu cuenta</p>

        <form style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Contraseña" type="password" />
          <button className="btn">Entrar</button>
        </form>
      </div>
    </div>
  )
}
