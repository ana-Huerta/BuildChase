import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import genshinApi from '../../services/genshinAPI'

export default function GenshinPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    genshinApi.get('/characters')
      .then((res) => {
        if (!mounted) return
        const data = res.data?.data || res.data || []
        setItems(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.response?.data?.message || err.message || 'Error al cargar datos')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="theme-genshin" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Genshin Builds</h1>
          <p className="page-sub">Minimalista y fácil de personalizar</p>
        </header>

        <main className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name || it.title}
              subtitle={it.weapon || it.principalRole || it.element || `Rarity: ${it.rarity || ''}`}
              image={it.imageFull || it.iconImage || '/service-placeholder.svg'}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
