import React, { useEffect, useState } from 'react'
import genshinApi from '../../services/genshinAPI'
import honkaiApi from '../../services/honkaiAPI'
import umamusumeApi from '../../services/umamusumeAPI'
import ReusableRelationModal from '../../components/layout/ReusableRelationModal'

const SERVICE_MAP = {
  genshin: { client: genshinApi, resources: ['characters','weapons','artifacts'] },
  honkai: { client: honkaiApi, resources: ['characters','lightcones','artifacts'] },
  uma: { client: umamusumeApi, resources: ['characters','cards','skills'] },
}

const RESOURCE_FIELDS = {
  characters: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'rarity', label: 'Rareza', type: 'select', options: ['1','2','3','4','5'] },
    { name: 'element', label: 'Elemento', type: 'select', options: ['Pyro','Hydro','Anemo','Electro','Dendro','Geo','Cryo'] },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
  weapons: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'type', label: 'Tipo', type: 'select', options: ['Sword','Claymore','Polearm','Bow','Catalyst'] },
    { name: 'rarity', label: 'Rareza', type: 'select', options: ['1','2','3','4','5'] },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
  artifacts: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'set', label: 'Set', type: 'text' },
    { name: 'rarity', label: 'Rareza', type: 'select', options: ['1','2','3','4','5'] },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
  cards: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'rarity', label: 'Rareza', type: 'select', options: ['C','B','A','S'] },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
  skills: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'cost', label: 'Coste', type: 'text' },
    { name: 'type', label: 'Tipo', type: 'text' },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
  lightcones: [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'rarity', label: 'Rareza', type: 'select', options: ['1','2','3','4','5'] },
    { name: 'image', label: 'Imagen URL', type: 'text' },
  ],
}

const RELATION_MAP = {
  honkai: {
    characters: [
      { field: 'recommendedArtifacts', resource: 'artifacts', label: 'Artifacts' },
      { field: 'recommendedLightcones', resource: 'lightcones', label: 'Lightcones' },
      { field: 'teammates', resource: 'characters', label: 'Teammates' }
    ],
    lightcones: [
      { field: 'recommendedCharacters', resource: 'characters', label: 'Characters' }
    ],
    artifacts: [
      { field: 'recommendedCharacters', resource: 'characters', label: 'Characters' }
    ]
  }

  ,
  genshin: {
    characters: [
      { field: 'recommendedWeapons', resource: 'weapons', label: 'Weapons' },
      { field: 'artifactSets', resource: 'artifacts', label: 'Artifacts' },
      { field: 'teammates', resource: 'characters', label: 'Teammates' }
    ],
    weapons: [
      { field: 'recommendedCharacters', resource: 'characters', label: 'Characters' }
    ],
    artifacts: [
      { field: 'recommendedCharacters', resource: 'characters', label: 'Characters' }
    ]
  }
  ,
  uma: {
    characters: [
      { field: 'recommendedCards', resource: 'cards', label: 'Cards' },
      { field: 'recommendedParents', resource: 'characters', label: 'Parents' },
      { field: 'recommendedSkills', resource: 'skills', label: 'Skills' }
    ]
  }
}

// Enum options extracted from backend models
const ENUM_MAP = {
  genshin: {
    characters: {
      element: ['Hydro','Anemo','Electro','Geo','Dendro','Cryo','Pyro'],
      weapon: ['Lanza','Arco','Espada Ligera','Mandoble','Catalizador'],
      role: ['DPS','Sub DPS','Support','Healer','Shield'],
      rarity: ['4','5']
    },
    weapons: {
      type: ['Lanza','Arco','Espada Ligera','Mandoble','Catalizador'],
      rarity: ['1','2','3','4','5']
    }
  },
  honkai: {
    characters: {
      element: ['Físico','Fuego','Hielo','Rayo','Viento','Cuántico','Imaginario'],
      path: ['Destrucción','Cacería','Erudición','Armonía','Nihilidad','Conservación','Abundancia','Reminiscencia','Exultación'],
      role: ['DPS','Sub-DPS','Support','Debuffer','Healer','Shielder'],
      rarity: ['4','5']
    },
    lightcones: {
      path: ['Destrucción','Cacería','Erudición','Armonía','Nihilidad','Preservación','Abundancia','Reminiscencia','Exultación'],
      rarity: ['3','4','5']
    }
  },
  uma: {
    cards: {
      rarity: ['R','SR','SSR'],
      type: ['Speed','Stamina','Power','Guts','Wit','Pal','Group']
    },
    characters: {
      rarity: ['1','2','3']
    },
    skills: {
      type: ['Unique Skill','Passive','Early Race','Mid Race','Late Race','Any Time']
    }
  }
}

export default function AdminPage() {
  const [service, setService] = useState('genshin')
  const [resource, setResource] = useState('characters')
  const [action, setAction] = useState('update')
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [payload, setPayload] = useState('')
  const [formState, setFormState] = useState({})
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [relationModalOpen, setRelationModalOpen] = useState(false)
  const [relationConfig, setRelationConfig] = useState(null)

  useEffect(() => {
    setResource(SERVICE_MAP[service].resources[0])
  }, [service])

  useEffect(() => {
    fetchList()
  }, [service, resource])

  async function fetchList() {
    setLoading(true)
    setMessage(null)
    try {
      const api = SERVICE_MAP[service].client
      const res = await api.get(`/${resource}`)
      const data = res.data?.data || res.data || []
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message })
    } finally { setLoading(false) }
  }

  function openForCreate() {
    setSelected(null)
    setPayload('')
    setAction('create')
  }

  function openForEdit(it) {
    setSelected(it)
    setPayload(JSON.stringify(it, null, 2))
    setFormState(it)
    setAction('update')
  }

  function openAddTeammate() {
    setShowAddModal(true)
  }

  function handleTeammateAdded(updatedCharacter) {
    if (updatedCharacter) {
      setSelected(updatedCharacter)
      setFormState({ ...updatedCharacter })
      fetchList()
    }
    setShowAddModal(false)
  }

  function openRelationModal(cfg) {
    setRelationConfig(cfg)
    setRelationModalOpen(true)
  }

  function handleRelationAdded(updated, relatedId) {
    if (updated) {
      setSelected(updated)
      setFormState({ ...updated })
      fetchList()
    }
    setRelationModalOpen(false)
  }

  async function handleRemoveRelation(field, relatedId) {
    if (!selected || !selected._id) return
    const api = SERVICE_MAP[service].client
    try {
      await api.delete(`/${resource}/${selected._id}/${field}/${relatedId}`)
      // refresh selected
      const res = await api.get(`/${resource}/${selected._id}`)
      const updated = res.data?.data
      if (updated) {
        setSelected(updated)
        setFormState({ ...updated })
        fetchList()
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message })
    }
  }

  async function submit() {
    setMessage(null)
    try {
      const api = SERVICE_MAP[service].client
      const body = action === 'create' || action === 'update'
        ? { ...formState }
        : {}
      let res
      if (action === 'create') res = await api.post(`/${resource}`, body)
      else if (action === 'update') {
        if (!selected || !selected._id) throw new Error('Selecciona un objeto para actualizar')
        res = await api.put(`/${resource}/${selected._id}`, body)
      } else if (action === 'delete') {
        if (!selected || !selected._id) throw new Error('Selecciona un objeto para eliminar')
        res = await api.delete(`/${resource}/${selected._id}`)
      }
      setMessage({ type: 'success', text: 'Operación realizada correctamente' })
      fetchList()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message })
    }
  }

  useEffect(() => {
    const fields = RESOURCE_FIELDS[resource] || []
    const defaults = {}
    fields.forEach(f => { defaults[f.name] = '' })
    setFormState(defaults)
    setPayload('')
    setSelected(null)
  }, [resource])

  useEffect(() => {
    if (selected) setFormState({ ...selected })
  }, [selected])

  function handleFieldChange(name, value) {
    setFormState(s => ({ ...s, [name]: value }))
  }

  function applyTemplate(it) {
    setSelected(null)
    setAction('create')
    setFormState({ ...it })
  }

  function prepareBody() {
    const body = {}
    const defs = RESOURCE_FIELDS[resource] || []
    for (const [k, v] of Object.entries(formState || {})) {
      if (v === undefined) continue
      // booleans and objects pass through
      if (typeof v === 'boolean' || typeof v === 'object') {
        body[k] = v
        continue
      }
      const str = String(v).trim()
      if (str === '') { body[k] = str; continue }
      // try JSON
      if ((str.startsWith('{') || str.startsWith('['))) {
        try { body[k] = JSON.parse(str); continue } catch (e) { /* fallthrough */ }
      }
      // check numeric if field defined as number
      const fd = defs.find(x => x.name === k)
      if (fd && fd.type === 'number') { body[k] = Number(str); continue }
      body[k] = str
    }
    return body
  }

  return (
    <div className="admin-panel" style={{ padding: 20 }}>
      <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>Panel de administración</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Área restringida — acciones CRUD sobre servicios.</p>

      <div className="admin-grid" style={{ marginTop: 18 }}>
        <aside className="admin-aside">
          <div style={{ display: 'grid', gap: 8 }}>
            <label>Servicio</label>
            <select value={service} onChange={e => setService(e.target.value)} className="input">
              {Object.keys(SERVICE_MAP).map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <label>Recurso</label>
            <select value={resource} onChange={e => setResource(e.target.value)} className="input">
              {SERVICE_MAP[service].resources.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label>Acción</label>
            <select value={action} onChange={e => setAction(e.target.value)} className="input">
              <option value="create">Crear</option>
              <option value="update">Actualizar</option>
              <option value="delete">Eliminar</option>
            </select>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={openForCreate}>Nuevo</button>
              <button className="btn" onClick={fetchList}>Refrescar</button>
            </div>
          </div>
        </aside>

        <section className="admin-main">
          <div className="admin-content">
            <div className="admin-list">
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Listado — {resource}</strong>
                <div style={{ color: 'var(--text-secondary)' }}>{loading ? 'Cargando...' : `${items.length} items`}</div>
              </div>

              <div className="admin-list-scroll">
                {items.map(it => (
                  <div key={it._id || it.id} className="list-item">
                    <div style={{ fontSize: 14 }}>{it.name || it.title || it._id || it.id}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn" onClick={() => openForEdit(it)}>Editar</button>
                      <button className="btn" onClick={() => { setSelected(it); setAction('delete'); setPayload(JSON.stringify(it, null, 2)) }}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-editor">
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Editor ({action})</strong>
                {RELATION_MAP[service] && RELATION_MAP[service][resource] && action === 'update' && selected && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {RELATION_MAP[service][resource].map(r => (
                      <button key={r.field} className="btn" onClick={() => openRelationModal({ relationField: r.field, relatedResource: r.resource, label: r.label })}>
                        Agregar {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="editor form-grid">
                {(() => {
                  const defined = RESOURCE_FIELDS[resource] || []
                  const dynamicKeys = Object.keys(formState || {})
                  const names = Array.from(new Set([...defined.map(d => d.name), ...dynamicKeys]))
                  const fields = names.map(name => {
                    const fd = defined.find(d => d.name === name)
                    // if there is an enum defined in backend models, prefer that
                    const enumOpts = (ENUM_MAP[service] && ENUM_MAP[service][resource] && ENUM_MAP[service][resource][name])
                    if (fd) {
                      if (enumOpts) return { ...fd, options: enumOpts, type: 'select' }
                      return fd
                    }
                    const val = formState[name]
                    let type = 'text'
                    if (enumOpts) type = 'select'
                    else if (typeof val === 'boolean') type = 'checkbox'
                    else if (typeof val === 'number') type = 'number'
                    else if (Array.isArray(val) || (val && typeof val === 'object')) type = 'json'
                    return { name, label: name, type, options: enumOpts }
                  })
                  return fields.map(f => (
                    <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f.label}</label>
                      {f.type === 'select' ? (
                        <select className="input" value={formState[f.name] ?? ''} onChange={e => handleFieldChange(f.name, e.target.value)}>
                          <option value="">—</option>
                          {f.options && f.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : f.type === 'checkbox' ? (
                        <input type="checkbox" checked={!!formState[f.name]} onChange={e => handleFieldChange(f.name, e.target.checked)} />
                      ) : f.type === 'json' ? (
                        <textarea className="input" value={typeof formState[f.name] === 'string' ? formState[f.name] : JSON.stringify(formState[f.name] ?? '', null, 2)} onChange={e => handleFieldChange(f.name, e.target.value)} style={{ height: 90 }} />
                      ) : (
                        <input className="input" value={formState[f.name] ?? ''} onChange={e => handleFieldChange(f.name, e.target.value)} />
                      )}
                    </div>
                  ))
                })()}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn" onClick={submit}>Ejecutar</button>
                <button className="btn" onClick={() => { setFormState({}); setSelected(null); setMessage(null) }}>Limpiar</button>
              </div>

              {/* Mostrar relaciones actuales como iconos (si existen) */}
              {RELATION_MAP[service] && RELATION_MAP[service][resource] && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {RELATION_MAP[service][resource].map(r => {
                    const vals = formState?.[r.field] || []
                    if (!vals || vals.length === 0) return null
                    return (
                      <div key={r.field} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <strong style={{ fontSize: 13 }}>{r.label}:</strong>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {vals.map(v => {
                            const id = v && (v._id || v)
                            const img = v && (v.iconImage || v.imageFull)
                            const name = v && v.name
                            return (
                              <div key={id} style={{ position: 'relative', width: 40, height: 40 }}>
                                <img src={img || ''} alt={name || id} title={name || ''} style={{ width: 40, height: 40, borderRadius: 6, background: '#222' }} />
                                <button onClick={() => handleRemoveRelation(r.field, id)} style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: 9, background: 'var(--danger)', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Reusable modal for relations */}
              {relationConfig && (
                <ReusableRelationModal
                  open={relationModalOpen}
                  onClose={() => setRelationModalOpen(false)}
                  api={SERVICE_MAP[service].client}
                  parentResource={resource}
                  parentId={selected?._id}
                  relatedResource={relationConfig.relatedResource}
                  relationField={relationConfig.relationField}
                  existingIds={(formState?.[relationConfig.relationField] || []).map(x => String(x._id || x))}
                  onAdded={handleRelationAdded}
                />
              )}

              {message && (
                <div style={{ marginTop: 10, color: message.type === 'error' ? 'var(--danger)' : 'var(--text-secondary)' }}>{message.text}</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
