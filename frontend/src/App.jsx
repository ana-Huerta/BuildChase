import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import HonkaiPage from './pages/honkai/HonkaiPage'
import GenshinPage from './pages/genshin/GenshinPage'
import UmaPage from './pages/umamusume/UmaPage'
import LoginPage from './pages/auth/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <nav className="nav">
          <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Home</NavLink>
          <NavLink to="/genshin" className={({isActive})=> isActive? 'active' : ''}>Genshin</NavLink>
          <NavLink to="/honkai" className={({isActive})=> isActive? 'active' : ''}>Honkai</NavLink>
          <NavLink to="/uma" className={({isActive})=> isActive? 'active' : ''}>Uma</NavLink>
          <NavLink to="/login" style={{ marginLeft: 'auto' }} className={({isActive})=> isActive? 'active' : ''}>Login</NavLink>
        </nav>

        <main>
          <Routes>
            <Route
              path='/'
              element={
                <div style={{ padding: 24 }}>
                  <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>Bienvenido a BuildChase</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Selecciona un servicio para ver builds y datos.</p>
                </div>
              }
            />
            <Route path='/genshin' element={<GenshinPage />} />
            <Route path='/honkai' element={<HonkaiPage />} />
            <Route path='/uma' element={<UmaPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
