import React from 'react'
import UmaSidebar from './UmaSidebar'
import { Ban } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function UmaSkillLayout({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const type = searchParams.get('type') || ''

  function setParam(k, v) {
    const s = new URLSearchParams(searchParams)
    if (!v || v === '') s.delete(k)
    else s.set(k, v)
    setSearchParams(s)
  }

  return (
    <div className="theme-uma" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 20, height: '100vh' }}>
          <UmaSidebar />

          <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <section style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: 'column' }}>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Tipo</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" className="btn-uma" value='' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn-uma" value='UniqueSkill' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'UniqueSkill' ? { outline: '2px solid var(--accent)'} : {} }>Skill Única</button>
                    <button type="button" className="btn-uma" value='Passive' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Passive' ? { outline: '2px solid var(--accent)'} : {} }>Pasiva</button>
                    <button type="button" className="btn-uma" value='Early Race' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Early Race' ? { outline: '2px solid var(--accent)'} : {} }>Early Race</button>
                    <button type="button" className="btn-uma" value='Mid Race' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Mid Race' ? { outline: '2px solid var(--accent)'} : {} }>Mid Race</button>
                    <button type="button" className="btn-uma" value='Late Race' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Late Race' ? { outline: '2px solid var(--accent)'} : {} }>Late Race</button>
                    <button type="button" className="btn-uma" value='Any Time' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Any Time' ? { outline: '2px solid var(--accent)'} : {} }>Any Time</button>
                    </div>
                </div>
              </div>
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
