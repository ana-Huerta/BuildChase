import React, { useEffect, useState } from 'react'

export default function ReusableRelationModal({
  open,
  onClose,
  api,
  parentResource, // e.g. 'characters'
  parentId,
  relatedResource, // e.g. 'artifacts'
  relationField, // e.g. 'recommendedArtifacts'
  existingIds = [],
  onAdded
}) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    api.get(`/${relatedResource}/simple`)
      .then(res => {
        const items = (res.data && res.data.data) || res.data || []
        const filtered = items.filter(i => !existingIds.includes(String(i._id)))
        setList(filtered)
      })
      .catch(err => { console.error(err); setList([]) })
      .finally(() => setLoading(false))
  }, [open, relatedResource, existingIds, api])

  async function handleSelect(relatedId) {
    try {
      const res = await api.post(`/${parentResource}/${parentId}/${relationField}`, { relatedId })
      const updated = res.data?.data
      if (onAdded) onAdded(updated, relatedId)
    } catch (err) {
      console.error('Error adding relation', err)
      alert(err.response?.data?.message || err.message)
    }
  }

  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ padding: 16, maxWidth: 720 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Agregar — {relationField}</h3>
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>

        {loading ? <div style={{ padding: 16 }}>Cargando...</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,64px)', gap: 12, marginTop: 12 }}>
            {list.map(p => (
              <button key={p._id} onClick={() => handleSelect(p._id)} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                <img src={p.iconImage || p.imageFull} alt={p.name} title={p.name} style={{ width: 64, height: 64, borderRadius: 8 }} />
                <div style={{ fontSize: 11, textAlign: 'center', marginTop: 6 }}>{p.name}</div>
              </button>
            ))}
            {list.length === 0 && <div style={{ gridColumn: '1/-1', color: 'var(--text-secondary)' }}>No hay elementos disponibles</div>}
          </div>
        )}
      </div>
    </div>
  )
}
