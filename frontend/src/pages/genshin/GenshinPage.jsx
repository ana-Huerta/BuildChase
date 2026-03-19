import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import genshinApi from '../../services/genshinAPI'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import GenshinLayout from '../../components/layout/GenshinLayout'
import GenshinCharacterModal from '../../components/layout/GenshinCharacterModal'
import { useSearchParams } from 'react-router-dom'

export default function GenshinPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    genshinApi.get('/characters', { params })
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
      <GenshinLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name || it.title}
              subtitle={it.weapon || it.principalRole || it.element || `Rarity: ${it.rarity || ''}`}
              image={it.iconImage || '/service-placeholder.svg'}
              tile
              onClick={() => setSelected(it)}
            />
          ))}
          <GenshinCharacterModal character={selected} onClose={() => setSelected(null)} />
        </div>
      </GenshinLayout>
    </main>
  )
}
