import React, { useEffect, useState } from 'react'
import ServiceLightconeCard from '../../components/ui/ServiceLightconeCard'
import honkaiApi from '../../services/honkaiAPI'
import HonkaiLightconeLayout from '../../components/layout/HonkaiLightconeLayout'
import Header from '../../components/layout/Header'
import { useSearchParams } from 'react-router-dom'
import HonkaiLightconeModal from '../../components/layout/HonkaiLightconeModal'

export default function HonkaiLightconesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    honkaiApi.get('/lightcones', { params })
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
      <Header/>
      <HonkaiLightconeLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceLightconeCard
              key={it._id || it.id}
              title={it.name}
              subtitle={`${it.path || ''} · Rareza: ${it.rarity || ''}`}
              image={it.iconImage || '/service-placeholder.svg'}
              tile
              onClick={() => setSelected(it)}
            />
          ))}
          <HonkaiLightconeModal lightcone={selected} onClose={() => setSelected(null)} />
        </div>
      </HonkaiLightconeLayout>
    </main>
  )
}
