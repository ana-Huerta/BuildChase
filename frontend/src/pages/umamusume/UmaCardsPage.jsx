import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import umamusumeApi from '../../services/umamusumeAPI'
import UmaCardLayout from '../../components/layout/UmaCardLayout'
import Header from '../../components/layout/Header'
import { useSearchParams } from 'react-router-dom'
import UmaCardModal from '../../components/layout/UmaCardModal'

export default function UmaCardsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    umamusumeApi.get('/cards', { params })
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

  const formatSubtitle = (it) => {
    if (!it) return ''
    const parts = []
    if (it.type) parts.push(it.type)
    if (it.rarity) parts.push(it.rarity)
    return parts.join(' · ')
  }

  return (
    <main>
      <Header />
      <UmaCardLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name}
              subtitle={formatSubtitle(it)}
              image={it.iconImage || it.imageFull || '/service-placeholder.svg'}
              tile
              onClick={() => setSelected(it)}
            />
          ))}
          <UmaCardModal card={selected} onClose={() => setSelected(null)} />
        </div>
      </UmaCardLayout>
    </main>
  )
}
