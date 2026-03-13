import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogIn } from 'lucide-react'
import { Power } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
      <header style={{ backgroundColor: 'rgba(var(--bg-primary), 0.80)', color: 'var(--text-primary)'}}>
      <nav className="nav container" style={{ margin: '0'}}>
        <div style={{ fontSize: 30, fontWeight: 500, display: 'flex', alignItems: 'center', fontFamily: 'Coolvetica, sans-serif' }}>
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img
              src={'/images/icon.png'}
              alt="logo"
              style={{ width: 60, height: 60 }}
            />
            BuildChaser
          </NavLink>
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', marginRight: -300 }}>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({isActive})=> isActive? 'active' : ''}>Admin</NavLink>
          )}

          {user ? (
            <button onClick={logout} className="btn"><Power size={18} /> Cerrar sesión</button>
          ) : (
            <NavLink to="/login" className={({isActive})=> isActive? 'active' : ''} style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12}}><LogIn size={18} /> Iniciar Sesión</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
