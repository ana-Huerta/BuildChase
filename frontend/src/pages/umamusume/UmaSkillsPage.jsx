import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import umamusumeApi from '../../services/umamusumeAPI'
import UmaSkillLayout from '../../components/layout/UmaSkillLayout'
import Header from '../../components/layout/Header'
import { useSearchParams } from 'react-router-dom'
import UmaSkillModal from '../../components/layout/UmaSkillModal'

export default function UmaSkillsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    umamusumeApi.get('/skills', { params })
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
    return `${it.type || ''} · Cost: ${it.cost ?? ''}`
  }

  return (
    <main>
      <Header />
      <UmaSkillLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => (
            <ServiceCard
              key={it._id || it.id}
              title={it.name}
              subtitle={''}
              image={it.iconImage || '/service-placeholder.svg'}
              tile
              onClick={() => setSelected(it)}
            />
          ))}
          <UmaSkillModal skill={selected} onClose={() => setSelected(null)} />
        </div>
      </UmaSkillLayout>
    </main>
  )
}
