import React from 'react'
import UmaSidebar from './UmaSidebar'
import { Ban } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function UmaLayout({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const rarity = searchParams.get('rarity') || ''
  const distance = searchParams.get('distance') || ''
  const style = searchParams.get('style') || ''

  function toggleGradeParam(param, grade) {
    const s = new URLSearchParams(searchParams)
    const cur = s.get(param) || ''
    const parts = cur === '' ? [] : cur.split(',')
    const idx = parts.indexOf(grade)
    if (idx === -1) parts.push(grade)
    else parts.splice(idx, 1)
    if (parts.length === 0) s.delete(param)
    else s.set(param, parts.join(','))
    setSearchParams(s)
  }

   const linkClassUma = ({ isFocus }) => isFocus ? 'btn-uma focus' : 'btn-uma'
   const linkClass = ({ isFocus }) => isFocus ? 'btn-focus' : 'btn'

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
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Distancia</div>
                  <div style={{ display: 'flex', gap: 8, fontFamily: 'MilkyLemon, sans-serif' }}>
                    <button type="button" className="btn-uma" value='' onClick={(e) => setParam('distance', e.currentTarget.value)} style={ distance === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn-uma" value='sprint' onClick={(e) => setParam('distance', e.currentTarget.value)} style={ distance === 'sprint' ? { outline: '2px solid var(--accent)'} : {} }>Sprint</button>
                    <button type="button" className="btn-uma" value='mile' onClick={(e) => setParam('distance', e.currentTarget.value)} style={ distance === 'mile' ? { outline: '2px solid var(--accent)'} : {} }>Mile</button>
                    <button type="button" className="btn-uma" value='medium' onClick={(e) => setParam('distance', e.currentTarget.value)} style={ distance === 'medium' ? { outline: '2px solid var(--accent)'} : {} }>Medium</button>
                    <button type="button" className="btn-uma" value='long' onClick={(e) => setParam('distance', e.currentTarget.value)} style={ distance === 'long' ? { outline: '2px solid var(--accent)'} : {} }>Long</button> 
                    <div style={{ display: 'flex', gap: 6, marginLeft: 6 }}>
                      <button type="button" className={searchParams.get('distanceGrade')?.split(',').includes('A') ? 'btn focus' : 'btn'} onClick={() => toggleGradeParam('distanceGrade','A')}>A</button>
                      <button type="button" className={searchParams.get('distanceGrade')?.split(',').includes('B') ? 'btn focus' : 'btn'} onClick={() => toggleGradeParam('distanceGrade','B')}>B</button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Estilo</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: 'MilkyLemon, sans-serif' }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='frontRunner' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'frontRunner' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://i.redd.it/1frwp82t1okg1.png'/></button>
                    <button type="button" className="btn" value='paceChaser' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'paceChaser' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-gr9qemst1okg1.png?width=640&crop=smart&auto=webp&s=5b6ac4e6b7cfa46faf20f1b1b32f0563372c2271'/></button>
                    <button type="button" className="btn" value='lateSurger' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'lateSurger' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-d8ad2gju1okg1.png?width=640&crop=smart&auto=webp&s=77832161f6ebb7952291e4c5270230ac079ef157'/></button>
                    <button type="button" className="btn" value='endCloser' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'endCloser' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-ngl1if5v1okg1.png?width=640&crop=smart&auto=webp&s=f403325451234d3489e43f68efe9bb59cc00b0e7'/></button>
                    <div style={{ display: 'flex', gap: 6, marginLeft: 6 }}>
                      <button type="button" className={searchParams.get('styleGrade')?.split(',').includes('A') ? 'btn focus' : 'btn'} onClick={() => toggleGradeParam('styleGrade','A')}>A</button>
                      <button type="button" className={searchParams.get('styleGrade')?.split(',').includes('B') ? 'btn focus' : 'btn'} onClick={() => toggleGradeParam('styleGrade','B')}>B</button>
                    </div>
                  </div>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Rareza</div>
                  <div>
                    <select
                      value={rarity}
                      onChange={(e) => setParam('rarity', e.target.value)}
                      className="input"
                      style={{ padding: '8px 36px 8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'var(--text-secondary)', minWidth: 120 }}
                    >
                      <option value="">Cualquiera</option>
                      <option value="3">★★★</option>
                      <option value="2">★★</option>
                      <option value="1">★</option>
                    </select>
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
