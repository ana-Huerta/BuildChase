import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ui/ServiceCard'
import umamusumeApi from '../../services/umamusumeAPI'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import UmaLayout from '../../components/layout/UmaLayout'
import { useSearchParams } from 'react-router-dom'
import UmaCharacterModal from '../../components/layout/UmaCharacterModal'

export default function UmaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = Object.fromEntries(Array.from(searchParams.entries()).filter(([k, v]) => v !== ''))
    umamusumeApi.get('/characters', { params })
      .then((res) => {
        if (!mounted) return
        const data = res.data?.data || res.data || []
        // Apply client-side filtering for grade-based distance/style filters
        const distanceType = searchParams.get('distance') || ''
        const distanceGrades = (searchParams.get('distanceGrade') || '').split(',').filter(Boolean)
        const styleType = searchParams.get('style') || ''
        const styleGrades = (searchParams.get('styleGrade') || '').split(',').filter(Boolean)

        function extractValues(v) {
          if (v == null) return []
          if (typeof v === 'string' || typeof v === 'number') return [String(v)]
          if (Array.isArray(v)) return v.flatMap(el => typeof el === 'string' || typeof el === 'number' ? [String(el)] : Object.values(el || {}).filter(Boolean).map(String))
          if (typeof v === 'object') return Object.values(v).filter(Boolean).map(String)
          return []
        }

        function matchesGradeForDistance(item) {
          if (distanceGrades.length === 0) return true
          const d = item.distances || {}
          if (distanceType) {
            const vals = extractValues(d[distanceType])
            return vals.some(v => distanceGrades.includes(v))
          }
          // any distance key matching
          return Object.values(d).some(v => extractValues(v).some(x => distanceGrades.includes(x)))
        }

        function matchesGradeForStyle(item) {
          if (styleGrades.length === 0) return true
          const s = item.styles || {}
          if (styleType) {
            const vals = extractValues(s[styleType])
            return vals.some(v => styleGrades.includes(v))
          }
          return Object.values(s).some(v => extractValues(v).some(x => styleGrades.includes(x)))
        }

        const filtered = (Array.isArray(data) ? data : []).filter((it) => matchesGradeForDistance(it) && matchesGradeForStyle(it))
        setItems(filtered)
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
      <UmaLayout>
        <div className="grid">
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          {!loading && !error && items.map((it) => {
            const formatSubtitle = (item) => {
              if (!item) return ''
              if (item.type) return item.type
              if (Array.isArray(item.styles)) {
                return item.styles.map(s => typeof s === 'string' ? s : Object.values(s).filter(Boolean).join(', ')).join(', ')
              }
              if (item.styles && typeof item.styles === 'object') {
                return Object.values(item.styles).filter(Boolean).join(', ')
              }
              return `Rarity: ${item.rarity || ''}`
            }

            return (
              <ServiceCard
                key={it._id || it.id}
                title={it.name || it.title}
                subtitle={''}
                image={it.iconImage || '/service-placeholder.svg'}
                tile
                onClick={() => setSelected(it)}
              />
            )
          })}
          <UmaCharacterModal character={selected} onClose={() => setSelected(null)} />
        </div>
      </UmaLayout>
    </main>
  )
}
