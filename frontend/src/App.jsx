import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HonkaiPage from './pages/honkai/HonkaiPage'
import HonkaiLightconesPage from './pages/honkai/HonkaiLightconesPage'
import HonkaiArtifactsPage from './pages/honkai/HonkaiArtifactsPage'
import GenshinPage from './pages/genshin/GenshinPage'
import GenshinWeaponsPage from './pages/genshin/GenshinWeaponsPage'
import GenshinArtifactsPage from './pages/genshin/GenshinArtifactsPage'
import UmaPage from './pages/umamusume/UmaPage'
import UmaCardsPage from './pages/umamusume/UmaCardsPage'
import UmaSkillsPage from './pages/umamusume/UmaSkillsPage'
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
            <Route path='/genshin/weapons' element={<GenshinWeaponsPage />} />
            <Route path='/genshin/artifacts' element={<GenshinArtifactsPage />} />
            <Route path='/honkai' element={<HonkaiPage />} />
            <Route path='/honkai/lightcones' element={<HonkaiLightconesPage />} />
            <Route path='/honkai/artifacts' element={<HonkaiArtifactsPage />} />
            <Route path='/uma' element={<UmaPage />} />
            <Route path='/uma/cards' element={<UmaCardsPage />} />
            <Route path='/uma/skills' element={<UmaSkillsPage />} />
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
