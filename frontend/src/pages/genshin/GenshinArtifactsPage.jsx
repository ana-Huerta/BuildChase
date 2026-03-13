import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import genshinApi from '../../services/genshinAPI'
import GenshinArtifactLayout from '../../components/layout/GenshinArtifactLayout'
import Header from '../../components/layout/Header'
import { useSearchParams } from 'react-router-dom'
import GenshinArtifactModal from '../../components/layout/GenshinArtifactModal'

export default function GenshinArtifactsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    genshinApi.get('/artifacts', { params })
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
  }, [searchParams.toString()])

  return (
    <main>
      <Header />
      <GenshinArtifactLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name}
              subtitle={ ''}
              image={it.imageFull || '/service-placeholder.svg'}
              tile
              onClick={() => setSelected(it)}
            />
          ))}
          <GenshinArtifactModal artifact={selected} onClose={() => setSelected(null)} />
        </div>
      </GenshinArtifactLayout>
    </main>
  )
}
