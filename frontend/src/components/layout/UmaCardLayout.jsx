import React from 'react'
import UmaSidebar from './UmaSidebar'
import {Ban} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function UmaCardLayout({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const rarity = searchParams.get('rarity') || ''
  const type = searchParams.get('type') || ''
  const style = searchParams.get('style') || ''

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
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='Speed' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Speed' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://img.game8.co/4215860/6dd970fab835ef46f73bd46253ca2d70.png/show'/></button>
                    <button type="button" className="btn" value='Stamina' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Stamina' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://img.game8.co/4215861/da59c92924fdef527d5bd04184ff87c7.png/show'/></button>
                    <button type="button" className="btn" value='Power' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Power' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://img.game8.co/4215858/c83b8057c62356630b3bd293e272354b.png/show'/></button>
                    <button type="button" className="btn" value='Guts' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Guts' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://img.game8.co/4215859/b02b8c92b20c8e3026c5bc2e7f02fcf7.png/show'/></button>
                    <button type="button" className="btn" value='Wit' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Wit' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height: '100%'}} src='https://img.game8.co/4215862/63bcaa618b84baf84439e9a2fe65fb87.png/show'/></button>
                    <button type="button" className="btn" value='Pal' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Pal' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://img.game8.co/4216611/98f0e951224219d91e12db977d119e3b.png/show'/></button>
                    <button type="button" className="btn" value='Group' onClick={(e) => setParam('type', e.currentTarget.value)} style={ type === 'Group' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://gametora.com/images/umamusume/icons/utx_ico_obtain_06.png'/></button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Estilo</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='frontRunner' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'frontRunner' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://i.redd.it/1frwp82t1okg1.png'/></button>
                    <button type="button" className="btn" value='paceChaser' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'paceChaser' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-gr9qemst1okg1.png?width=640&crop=smart&auto=webp&s=5b6ac4e6b7cfa46faf20f1b1b32f0563372c2271'/></button>
                    <button type="button" className="btn" value='lateSurger' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'lateSurger' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-d8ad2gju1okg1.png?width=640&crop=smart&auto=webp&s=77832161f6ebb7952291e4c5270230ac079ef157'/></button>
                    <button type="button" className="btn" value='endCloser' onClick={(e) => setParam('style', e.currentTarget.value)} style={ style === 'endCloser' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width: '100%', height:'100%'}} src='https://preview.redd.it/anyone-know-where-i-can-find-the-file-for-these-running-v0-ngl1if5v1okg1.png?width=640&crop=smart&auto=webp&s=f403325451234d3489e43f68efe9bb59cc00b0e7'/></button>
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
                      <option value="R">R</option>
                      <option value="SR">SR</option>
                      <option value="SSR">SSR</option>
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
