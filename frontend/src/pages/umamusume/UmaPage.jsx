import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import umamusumeApi from '../../services/umamusumeAPI'

export default function UmaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    // try /cards then /characters as fallback
    umamusumeApi.get('/cards')
      .then((res) => {
        if (!mounted) return
        const data = res.data?.data || res.data || []
        setItems(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!mounted) return
        return umamusumeApi.get('/characters')
          .then((res) => {
            if (!mounted) return
            const data = res.data?.data || res.data || []
            setItems(Array.isArray(data) ? data : [])
          })
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.response?.data?.message || err.message || 'Error al cargar datos')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="theme-uma" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Uma Musume Builds</h1>
          <p className="page-sub">Minimalista y fácil de personalizar</p>
        </header>

        <main className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name || it.title}
              subtitle={it.type || it.styles || `Rarity: ${it.rarity || ''}`}
              image={it.imageFull || it.iconImage || '/service-placeholder.svg'}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
