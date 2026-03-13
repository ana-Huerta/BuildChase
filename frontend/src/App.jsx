import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HonkaiPage from './pages/honkai/HonkaiPage'
import GenshinPage from './pages/genshin/GenshinPage'
import UmaPage from './pages/umamusume/UmaPage'
import LoginPage from './pages/auth/LoginPage'
import AdminPage from './pages/admin/AdminPage'
import ProtectedRoute from './router/ProtectedRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomeLanding from './components/layout/HomeLanding'

export default function App() {
  const wrapperStyle = {
    position: 'relative',
    color: '#fff',
    backgroundImage: 'url(/images/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 0,
    minHeight: '100vh',
    minWidth: '100vw',
    }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundImage: 'url(/images/bg.jpg)', color: 'var(--text-primary)' }}>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<HomeLanding/>} />
            <Route path='/genshin' element={<GenshinPage />} />
            <Route path='/honkai' element={<HonkaiPage />} />
            <Route path='/uma' element={<UmaPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/admin' element={
              <ProtectedRoute requireAdmin>
                <AdminPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
