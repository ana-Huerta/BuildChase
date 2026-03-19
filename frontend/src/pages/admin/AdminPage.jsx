import React, { useEffect, useState } from 'react'
import genshinApi from '../../services/genshinAPI'
import honkaiApi from '../../services/honkaiAPI'
import umamusumeApi from '../../services/umamusumeAPI'
import ReusableRelationModal from '../../components/layout/ReusableRelationModal'
import ConfirmModal from '../../components/layout/ConfirmModal'
import Header from '../../components/layout/Header'
import {X} from 'lucide-react'

const SERVICE_MAP = {
  Genshin_Impact: { client: genshinApi, resources: ['Characters','Weapons','Artifacts'] },
  Honkai_Star_Rail: { client: honkaiApi, resources: ['Characters','Lightcones','Artifacts'] },
  Umamusume: { client: umamusumeApi, resources: ['Characters','Cards','Skills'] },
}

const RESOURCE_FIELDS = {
  Genshin_Impact: {
    Characters: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'element', label: 'Elemento', type: 'select' },
      { name: 'weapon', label: 'Arma', type: 'select' },
      { name: 'principalRole', label: 'Rol', type: 'select' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'artifactSets', label: 'Artifact Sets (json)', type: 'json' },
      { name: 'recommendedWeapons', label: 'Recommended Weapons (json)', type: 'json' },
      { name: 'teammates', label: 'Teammates (json)', type: 'json' },
      { name: 'stats', label: 'Stats (json)', type: 'json' },
      { name: 'relicAttributes', label: 'Relic Attributes (json)', type: 'json' },
      { name: 'talents', label: 'Talents (json)', type: 'json' }
    ],
    Weapons: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'weaponType', label: 'Tipo de arma', type: 'select' },
      { name: 'description', label: 'Descripción', type: 'text' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'recommendedCharacters', label: 'Recommended Characters (json)', type: 'json' },
      { name: 'stats', label: 'Stats (json)', type: 'json' },
      { name: 'refinement', label: 'Refinement (json)', type: 'json' }
    ],
    Artifacts: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description1', label: 'Descripción 1', type: 'text' },
      { name: 'description2', label: 'Descripción 2', type: 'text' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'recommendedCharacters', label: 'Recommended Characters (json)', type: 'json' }
    ]
  },

  Honkai_Star_Rail: {
    Characters: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'element', label: 'Elemento', type: 'select' },
      { name: 'path', label: 'Vía', type: 'select' },
      { name: 'principalRole', label: 'Rol', type: 'select' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'artifactSets', label: 'Artifact Sets (json)', type: 'json' },
      { name: 'recommendedLightcones', label: 'Recommended Lightcones (json)', type: 'json' },
      { name: 'recommendedArtifacts', label: 'Recommended Artifacts (json)', type: 'json' },
      { name: 'teammates', label: 'Teammates (json)', type: 'json' },
      { name: 'stats', label: 'Stats (json)', type: 'json' },
      { name: 'relicAttributes', label: 'Relic Attributes (json)', type: 'json' },
      { name: 'traces', label: 'Traces (json)', type: 'json' }
    ],
    Lightcones: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'text' },
      { name: 'path', label: 'Vía', type: 'select' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'recommendedCharacters', label: 'Recommended Characters (json)', type: 'json' },
      { name: 'stats', label: 'Stats (json)', type: 'json' },
      { name: 'superpositionEffects', label: 'Superposition Effects (json)', type: 'json' }
    ],
    Artifacts: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description1', label: 'Descripción 1', type: 'text' },
      { name: 'description2', label: 'Descripción 2', type: 'text' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'recommendedCharacters', label: 'Recommended Characters (json)', type: 'json' }
    ]
  },

  Umamusume: {
    Characters: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'tracks', label: 'Tracks (json)', type: 'json' },
      { name: 'distances', label: 'Distances (json)', type: 'json' },
      { name: 'styles', label: 'Styles (json)', type: 'json' },
      { name: 'cardSet', label: 'Card Set (json)', type: 'json' },
      { name: 'recommendedCards', label: 'Recommended Cards (json)', type: 'json' },
      { name: 'recommendedParents', label: 'Recommended Parents (json)', type: 'json' },
      { name: 'recommendedSkills', label: 'Recommended Skills (json)', type: 'json' },
      { name: 'legacyParents', label: 'Legacy Parents (json)', type: 'json' },
      { name: 'legacySparks', label: 'Legacy Sparks', type: 'select' },
      { name: 'stats', label: 'Stats (json)', type: 'json' },
      { name: 'grownStatRate', label: 'Grown Stat Rate (json)', type: 'json' },
      { name: 'skills', label: 'Skills (json)', type: 'json' },
      { name: 'secretEvent', label: 'Secret Event (json)', type: 'json' },
      { name: 'statsSearched', label: 'Stats Searched (json)', type: 'json' }
    ],
    Cards: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'uniquePerk', label: 'Unique Perk', type: 'text' },
      { name: 'character', label: 'Character (id)', type: 'text' },
      { name: 'rarity', label: 'Rareza', type: 'select' },
      { name: 'imageFull', label: 'Imagen (full)', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'type', label: 'Tipo', type: 'select' },
      { name: 'styles', label: 'Styles (json)', type: 'json' },
      { name: 'skills', label: 'Skills (json)', type: 'json' },
      { name: 'effects', label: 'Effects (json)', type: 'json' }
    ],
    Skills: [
      { name: 'name', label: 'Nombre', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'text' },
      { name: 'iconImage', label: 'Icono (URL)', type: 'text' },
      { name: 'type', label: 'Tipo', type: 'select' },
      { name: 'cost', label: 'Coste', type: 'number' }
    ]
  }
}

const RELATION_MAP = {
  Honkai_Star_Rail: {
    Characters: [
      { field: 'recommendedArtifacts', resource: 'Artifacts', label: 'Artifacts' },
      { field: 'recommendedLightcones', resource: 'Lightcones', label: 'Lightcones' },
      { field: 'teammates', resource: 'Characters', label: 'Teammates' }
    ],
    Lightcones: [
      { field: 'recommendedCharacters', resource: 'Characters', label: 'Characters' }
    ],
    Artifacts: [
      { field: 'recommendedCharacters', resource: 'Characters', label: 'Characters' }
    ]
  }

  ,
  Genshin_Impact: {
    Characters: [
      { field: 'recommendedWeapons', resource: 'Weapons', label: 'Weapons' },
      // backend route is 'recommendedArtifacts' but stored field is 'artifactSets'
      { field: 'artifactSets', route: 'recommendedArtifacts', resource: 'Artifacts', label: 'Artifacts' },
      { field: 'teammates', resource: 'Characters', label: 'Teammates' }
    ],
    Weapons: [
      { field: 'recommendedCharacters', resource: 'Characters', label: 'Characters' }
    ],
    Artifacts: [
      { field: 'recommendedCharacters', resource: 'Characters', label: 'Characters' }
    ]
  }
  ,
  Umamusume: {
    Characters: [
      { field: 'recommendedCards', resource: 'Cards', label: 'Cards' },
      { field: 'recommendedParents', resource: 'Characters', label: 'Parents' },
      { field: 'recommendedSkills', resource: 'Skills', label: 'Skills' }
    ]
  }
}

// Enum options extracted from backend models
const ENUM_MAP = {
  Genshin_Impact: {
    Characters: {
      element: ['Hydro','Anemo','Electro','Geo','Dendro','Cryo','Pyro'],
      weapon: ['Lanza','Arco','Espada Ligera','Mandoble','Catalizador'],
      principalRole: ['DPS','Sub DPS','Support','Healer','Shield'],
      rarity: ['4','5']
    },
    Weapons: {
      weaponType: ['Lanza','Arco','Espada Ligera','Mandoble','Catalizador'],
      rarity: ['1','2','3','4','5']
    }
  },
  Honkai_Star_Rail: {
    Characters: {
      element: ['Físico','Fuego','Hielo','Rayo','Viento','Cuántico','Imaginario'],
      path: ['Destrucción','Cacería','Erudición','Armonía','Nihilidad','Conservación','Abundancia','Reminiscencia','Exultación'],
      principalRole: ['DPS','Sub-DPS','Support','Debuffer','Healer','Shielder'],
      rarity: ['4','5']
    },
    Lightcones: {
      path: ['Destrucción','Cacería','Erudición','Armonía','Nihilidad','Preservación','Abundancia','Reminiscencia','Exultación'],
      rarity: ['3','4','5']
    }
  },
  Umamusume: {
    cards: {
      rarity: ['R','SR','SSR'],
      type: ['Speed','Stamina','Power','Guts','Wit','Pal','Group']
    },
    characters: {
      rarity: ['1','2','3'],
      legacySparks: ['18 Speed','18 Stamina','18 Power','18 Wit','9 Speed 9 Stamina','9 Speed 9 Power','9 Speed 9 Wit','9 Stamina 9 Power','9 Stamina 9 Wit','9 Power 9 Wit']
    },
    skills: {
      type: ['Unique Skill','Passive','Early Race','Mid Race','Late Race','Any Time']
    }
  }
}

export default function AdminPage() {
  const [service, setService] = useState('Genshin_Impact')
  const [resource, setResource] = useState('Characters')
  const [action, setAction] = useState('update')
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [payload, setPayload] = useState('')
  const [formState, setFormState] = useState({})
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null) // 'delete' | 'save' | null
  const [showAddModal, setShowAddModal] = useState(false)
  const [relationModalOpen, setRelationModalOpen] = useState(false)
  const [relationConfig, setRelationConfig] = useState(null)
  const [editorModalOpen, setEditorModalOpen] = useState(false)

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
    // initialize formState according to selected resource schema
    const fields = (RESOURCE_FIELDS[service] && RESOURCE_FIELDS[service][resource]) || []
    const defaults = {}
    fields.forEach(f => { defaults[f.name] = '' })
    setFormState(defaults)
    setEditorModalOpen(true)
  }

  function openForEdit(it) {
    setSelected(it)
    setPayload(JSON.stringify(it, null, 2))
    setFormState(it)
    setAction('update')
    setEditorModalOpen(true)
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

  function handleRelationPicked(relatedItem, field) {
    if (!relatedItem) return
    const normalized = { _id: relatedItem._id || relatedItem.id || relatedItem._id, name: relatedItem.name || relatedItem.title || '', iconImage: relatedItem.iconImage || relatedItem.imageFull || '' }
    setFormState(s => {
      const prev = Array.isArray(s[field]) ? s[field] : []
      // avoid duplicates
      if (prev.find(x => String(x._id || x.id || x) === String(normalized._id))) return s
      return { ...s, [field]: [...prev, normalized] }
    })
    setRelationModalOpen(false)
  }

  function handleRelationAdded(updated, relatedId) {
    if (updated) {
      setSelected(updated)
      setFormState({ ...updated })
      fetchList()
      setMessage({ type: 'success', text: 'Relación agregada correctamente' })
    }
    setRelationModalOpen(false)
  }

  async function handleRemoveRelation(field, relatedId) {
    const api = SERVICE_MAP[service].client
    // if editing existing item on server, call API delete; otherwise remove locally from formState
    if (selected && selected._id) {
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
      return
    }

    // local removal for create-mode
    setFormState(s => {
      const prev = Array.isArray(s[field]) ? s[field] : []
      const next = prev.filter(x => String(x._id || x.id || x) !== String(relatedId))
      return { ...s, [field]: next }
    })
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

  async function handleConfirmDelete() {
    // kept for backward compat; delegate to generic handler
    await handleConfirmAction()
  }

  async function handleConfirmAction() {
    try {
      setConfirmLoading(true)
      await submit()
    } finally {
      setConfirmLoading(false)
      setConfirmOpen(false)
      setConfirmAction(null)
    }
  }

  useEffect(() => {
    const fields = (RESOURCE_FIELDS[service] && RESOURCE_FIELDS[service][resource]) || []
    const defaults = {}
    fields.forEach(f => { defaults[f.name] = '' })
    setFormState(defaults)
    setPayload('')
    setSelected(null)
  }, [resource])

  useEffect(() => {
    if (selected) setFormState({ ...selected })
  }, [selected])

  // auto-dismiss success messages after a short delay
  useEffect(() => {
    if (!message || message.type !== 'success') return
    const t = setTimeout(() => setMessage(null), 4000)
    return () => clearTimeout(t)
  }, [message])

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
    const defs = (RESOURCE_FIELDS[service] && RESOURCE_FIELDS[service][resource]) || []
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
    <main>
    <Header />

    {message && message.type === 'success' && (
      <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)', color: 'var(--text-primary)', padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{message.text}</div>
        <button className="btn" onClick={() => setMessage(null)} style={{ marginLeft: 12 }}>Cerrar</button>
      </div>
    )}

    {(() => {
      const isDelete = confirmAction === 'delete'
      const isSave = confirmAction === 'save'
      const title = isDelete ? `Eliminar ${resource}` : isSave ? `${action === 'create' ? 'Crear' : 'Guardar'} ${resource}` : 'Confirmar'
      const desc = isDelete
        ? (selected ? `¿Confirma eliminar "${selected.name || selected.title || selected._id}"? Esta acción no se puede deshacer.` : '¿Confirma esta acción?')
        : isSave
          ? (action === 'create' ? 'Se creará un nuevo elemento. ¿Desea continuar?' : 'Se guardarán los cambios. ¿Desea continuar?')
          : ''
      const confirmText = isDelete ? 'Eliminar' : isSave ? (action === 'create' ? 'Crear' : 'Guardar') : 'Confirmar'
      const danger = isDelete
      return (
        <ConfirmModal
          isOpen={confirmOpen}
          title={title}
          description={desc}
          confirmText={confirmText}
          cancelText="Cancelar"
          danger={danger}
          loading={confirmLoading}
          onConfirm={handleConfirmAction}
          onCancel={() => { setConfirmOpen(false); setConfirmAction(null) }}
        />
      )
    })()}

    <div className="admin-panel">
      <div className="container">
        <div className="admin-grid" style={{ marginTop: 18 }}>
          <aside className="admin-aside">
            <div className="card" style={{ padding: 12 }}>
              <label style={{ fontSize: 13, color: 'var(--honkai-fourth)' }}>Servicio</label>
              <select value={service} onChange={e => setService(e.target.value)} className="input" style={{ appearance: 'none',WebkitAppearance: 'none', MozAppearance: 'none',  padding: '8px 36px 8px 12px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-secondary)', minWidth: 120, marginBottom: 8}}>
                {Object.keys(SERVICE_MAP).map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <label style={{ fontSize: 13, color: 'var(--honkai-fourth)' }}>Recurso</label>
              <select value={resource} onChange={e => setResource(e.target.value)} className="input" style={{ appearance: 'none',WebkitAppearance: 'none', MozAppearance: 'none',  padding: '8px 36px 8px 12px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-secondary)', minWidth: 120, marginBottom: 8}}>
                {SERVICE_MAP[service].resources.map(r => <option key={r} value={r}>{r}</option>)}
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
                  <div style={{ color: 'var(--text-primary)' }}>{loading ? 'Cargando...' : `${items.length} items`}</div>
                </div>

                <div className="admin-list-scroll">
                  {items.map(it => (
                    <div key={it._id || it.id} className="list-item">
                      <div style={{ fontSize: 14 }}> {it.name || it.title || it._id || it.id}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn" onClick={() => openForEdit(it)}>Editar</button>
                        <button className="btn" onClick={() => { setSelected(it); setAction('delete'); setPayload(JSON.stringify(it, null, 2)); setConfirmAction('delete'); setConfirmOpen(true); }}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor rendered inside a modal to match ReusableRelationModal behavior */}
              {editorModalOpen && (
                <div className="hc-modal-overlay">
                  <div className="hc-modal-genshin">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>Editor ({action})</strong>
                      <div>
                        <button onClick={() => setEditorModalOpen(false)} style={{ marginRight: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)'}}><X size={26} /></button>
                      </div>
                    </div>

                    <div style={{ marginTop: 8 }}>

                      <div className="card editor form-grid" style={{ padding: 12 }}>
                        {(() => {
                          const defined = (RESOURCE_FIELDS[service] && RESOURCE_FIELDS[service][resource]) || []
                          const dynamicKeys = Object.keys(formState || {})
                          const names = Array.from(new Set([...defined.map(d => d.name), ...dynamicKeys]))
                          const fields = names.map(name => {
                            const fd = defined.find(d => d.name === name)
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
                          const relations = RELATION_MAP[service]?.[resource] || []
                          const relationFields = relations.map(r => r.field)

                          return fields.map(f => {
                            // relation field rendering
                            if (relationFields.includes(f.name)) {
                              const relation = relations.find(r => r.field === f.name)
                              const vals = Array.isArray(formState?.[f.name]) ? formState[f.name] : []
                              return (
                                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  <label style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.label}</label>

                                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {vals.map(v => {
                                      const id = v && (v._id || v.id || v)
                                      const img = v && (v.iconImage || v.imageFull)
                                      const name = v && v.name
                                      return (
                                        <div key={id} style={{ position: 'relative', width: 40, height: 40 }}>
                                          <img src={img || ''} alt={name || id} title={name || ''} style={{ width: 40, height: 40, borderRadius: 6, background: '#222' }} />
                                          <button onClick={() => handleRemoveRelation(f.name, id)} style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: 9, background: 'var(--danger)', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
                                        </div>
                                      )
                                    })}
                                  </div>

                                  <button className="btn" onClick={() => openRelationModal({ relationField: relation.field, routeField: relation.route || relation.field, relatedResource: relation.resource, label: relation.label, addDirect: action === 'create' })}>
                                    + 
                                  </button>
                                </div>
                              )
                            }

                            // non-relation fields
                            if (f.type === 'select') {
                              return (
                                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  <label style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.label}</label>
                                  <select className="input" value={formState[f.name] ?? ''} onChange={e => handleFieldChange(f.name, e.target.value)}>
                                    <option value="">—</option>
                                    {f.options && f.options.map(o => <option key={o} value={o}>{o}</option>)}
                                  </select>
                                </div>
                              )
                            }

                            if (f.type === 'checkbox') {
                              return (
                                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  <label style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.label}</label>
                                  <input type="checkbox" checked={!!formState[f.name]} onChange={e => handleFieldChange(f.name, e.target.checked)} />
                                </div>
                              )
                            }

                            if (f.type === 'json') {
                              return (
                                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  <label style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.label}</label>
                                  <textarea className="input" value={typeof formState[f.name] === 'string' ? formState[f.name] : JSON.stringify(formState[f.name] ?? '', null, 2)} onChange={e => handleFieldChange(f.name, e.target.value)} style={{ height: 90 }} />
                                </div>
                              )
                            }

                            return (
                              <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.label}</label>
                                <input className="input" value={formState[f.name] ?? ''} onChange={e => handleFieldChange(f.name, e.target.value)} />
                              </div>
                            )
                          })
                        })()}
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button className="btn" onClick={() => { setConfirmAction('save'); setConfirmOpen(true); setEditorModalOpen(false); }}>{action === 'create' ? 'Crear' : 'Guardar'}</button>
                        <button className="btn" onClick={() => { setFormState({}); setSelected(null); setMessage(null); setEditorModalOpen(false) }}>Limpiar</button>
                      </div>

                        {relationConfig && (
                        <ReusableRelationModal
                          open={relationModalOpen}
                          onClose={() => setRelationModalOpen(false)}
                          api={SERVICE_MAP[service].client}
                          parentResource={resource}
                          parentId={selected?._id}
                          relatedResource={relationConfig.relatedResource}
                          // use routeField for the endpoint (fallback to relationField)
                          relationField={relationConfig.routeField || relationConfig.relationField}
                          // existingIds must reflect the form field where values are stored
                          existingIds={(formState?.[relationConfig.relationField] || []).map(x => String(x._id || x))}
                          onAdded={handleRelationAdded}
                          onPick={(item) => handleRelationPicked(item, relationConfig.relationField)}
                        />
                      )}

                      {message && (
                        <div style={{ marginTop: 10, color: message.type === 'error' ? 'var(--danger)' : 'var(--text-secondary)' }}>{message.text}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  )
}
