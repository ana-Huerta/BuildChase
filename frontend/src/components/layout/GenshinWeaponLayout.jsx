import React from 'react'
import { Ban } from 'lucide-react'
import GenshinSidebar from './GenshinSidebar'
import { useSearchParams } from 'react-router-dom'

export default function GenshinWeaponLayout({ title = '', subtitle = '', children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const rarity = searchParams.get('rarity') || ''
  const weapon = searchParams.get('weapon') || ''

  function setParam(k, v) {
    const s = new URLSearchParams(searchParams)
    if (!v || v === '') s.delete(k)
    else s.set(k, v)
    setSearchParams(s)
  }

  return (
    <div className="theme-genshin" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 20, height: '100vh' }}>
          <GenshinSidebar />
          <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <section style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Arma</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='Lanza' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Lanza' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Icon_Polearm.png' alt='Lanza'/></button>
                    <button type="button" className="btn" value='Arco' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Arco' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Bow.png' alt='Arco'/></button>
                    <button type="button" className="btn" value='Espada Ligera' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Espada Ligera' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Sword.png' alt='Espada Ligera'/></button>
                    <button type="button" className="btn" value='Mandoble' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Mandoble' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/6/66/Icon_Claymore.png' alt='Mandoble'/></button>
                    <button type="button" className="btn" value='Catalizador' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Catalizador' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/2/27/Icon_Catalyst.png' alt='Catalizador'/></button>
                  </div>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Rareza</div>
                  <div>
                    <select
                      value={rarity}
                      onChange={(e) => setParam('rarity', e.target.value)}
                      className="input"
                      style={{ padding: '8px 36px 8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'var(--text-primary)', minWidth: 120 }}
                    >
                      <option value="">Cualquiera</option>
                      <option value="5">★★★★★</option>
                      <option value="4">★★★★</option>
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
