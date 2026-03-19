import React from 'react'
import { Ban } from 'lucide-react'
import GenshinSidebar from './GenshinSidebar'
import { useSearchParams } from 'react-router-dom'

export default function GenshinLayout({ title = '', subtitle = '', children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const rarity = searchParams.get('rarity') || ''
  const element = searchParams.get('element') || ''
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
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Elemento</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='Hydro' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Hydro' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/genshin-weaponelement-relationships/images/0/08/Hydro.png' alt='Hydro'/></button>
                    <button type="button" className="btn" value='Anemo' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Anemo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://genshinimpact.wiki.fextralife.com/file/Genshin-Impact/anemo-element-genshin-impact-wiki-guide.png' alt='Anemo'/></button>
                    <button type="button" className="btn" value='Electro' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Electro' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.png' alt='Electro'/></button>
                    <button type="button" className="btn" value='Geo' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Geo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.png' alt='Geo'/></button>
                    <button type="button" className="btn" value='Dendro' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Dendro' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://upload-os-bbs.hoyolab.com/upload/2021/01/17/9593508/0e9c620555ed4ae16f446fc6893d65d6_2275239988341769064.png' alt='Dendro'/></button>
                    <button type="button" className="btn" value='Cryo' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Cryo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png' alt='Cryo'/></button>
                    <button type="button" className="btn" value='Pyro' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Imaginario' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.png' alt='Pyro'/></button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', marginRight: 8 }}>Arma</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" className="btn" value='' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                    <button type="button" className="btn" value='Lanza' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Lanza' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Icon_Polearm.png' alt='Lanza'/></button>
                    <button type="button" className="btn" value='Arco' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Arco' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Bow.png' alt='Arco'/></button>
                    <button type="button" className="btn" value='Espada Ligera' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Espada Ligera' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Sword.png' alt='Espada Ligera'/></button>                                    
                    <button type="button" className="btn" value='Mandoble' onClick={(e) => setParam('weapon', e.currentTarget.value)} style={ weapon === 'Rayo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/gensin-impact/images/6/66/Icon_Claymore.png' alt='Mandoble'/></button>
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
                      style={{ appearance: 'none',WebkitAppearance: 'none', MozAppearance: 'none',  padding: '8px 36px 8px 12px', borderRadius: 8, background: 'rgba(53, 66, 140, .4)', border: '1px solid var(--border)', color: 'var(--text-secondary)', minWidth: 120}}
                    >
                      <option value="">Cualquiera</option>
                      <option value="5">★★★★★</option>
                      <option value="4">★★★★</option>
                    </select>

                  </div>
                </div>
              </div>
            </section>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--text-primary)' }} xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
