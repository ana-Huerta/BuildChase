import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogIn } from 'lucide-react'
import { Power } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header style={{ backgroundColor: 'rgba(var(--bg-primary), 0.80)', color: 'var(--text-primary)' }}>
      <nav className="nav container header-nav" style={{ margin: 0, display: 'flex', alignItems: 'center', width: '100%', padding: '1rem 0', gap: '75%' }}>
        <NavLink to="/" className="logo">
          <img src={'/images/icon.png'} alt="logo" />
          <div className="hc-logo" style={{ fontFamily: 'Coolvetica, sans-serif', fontSize: 26, background: 'transparent' }}>BuildChaser</div>
        </NavLink>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center'}}>
          <NavLink to="/genshin" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Genshin</NavLink>
          <NavLink to="/honkai" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Honkai</NavLink>
          <NavLink to="/uma" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Uma</NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Admin</NavLink>
          )}

          {user ? (
            <button onClick={logout} className="btn-off" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Power size={16} />
              <span>Cerrar sesión</span>
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LogIn size={16} />
              <span>Iniciar Sesión</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
