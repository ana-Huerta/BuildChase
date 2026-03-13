import React from 'react'
import HonkaiSidebar from './HonkaiSidebar'
import {Ban} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function HonkaiLayout({ title = '', subtitle = '', children }) {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const rarity = searchParams.get('rarity') || ''
    const path = searchParams.get('path') || ''
    const element = searchParams.get('element') || ''
    
    function setParam(k, v) {
      const s = new URLSearchParams(searchParams)
      if (!v || v === '') s.delete(k)
      else s.set(k, v)
      setSearchParams(s)
    }

  return (
    <div className="theme-honkai" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div className="container">
            <div style={{ display: 'flex', gap: 20, height: '100vh' }}>
                <HonkaiSidebar/>

                <main style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                    <section style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: 'column'}}>

                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: 'row' }}>
                                <div style={{ color: 'var(--text-primary)', marginRight: 8, fontFamily: 'MilkyLemon, sans-serif'}}>Elemento</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="button" className="btn" value='' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                                    <button type="button" className="btn" value='Físico' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Físico' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/6/69/Type_Physical.png' alt='Físico'/></button>
                                    <button type="button" className="btn" value='Fuego' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Fuego' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/f/f0/Type_Fire.png' alt='Fuego'/></button>
                                    <button type="button" className="btn" value='Hielo' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Hielo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/3/35/Type_Ice.png' alt='Hielo'/></button>
                                    <button type="button" className="btn" value='Rayo' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Rayo' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/1/15/Type_Lightning.png' alt='Rayo'/></button>
                                    <button type="button" className="btn" value='Viento' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Viento' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/e/ec/Type_Wind.png' alt='Viento'/></button>
                                    <button type="button" className="btn" value='Cuántico' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Cuántico' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/5/54/Type_Quantum.png' alt='Cuántico'/></button>
                                    <button type="button" className="btn" value='Imaginario' onClick={(e) => setParam('element', e.currentTarget.value)} style={ element === 'Imaginario' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/2/2f/Type_Imaginary.png' alt='Imaginario'/></button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--text-primary)', marginRight: 8 , fontFamily: 'MilkyLemon, sans-serif'}}>Vía</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="button" className="btn" value='' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === '' ? { outline: '2px solid var(--accent)'} : {} }><Ban/></button>
                                    <button type="button" className="btn" value='Destrucción' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Destrucción' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/d/df/Path_Destruction.png' alt='Destrucción'/></button>
                                    <button type="button" className="btn" value='Cacería' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Cacería' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/1/1c/Path_The_Hunt.png' alt='Cacería'/></button>
                                    <button type="button" className="btn" value='Erudición' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Erudición' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/5/53/Path_Erudition.png' alt='Erudición'/></button>
                                    <button type="button" className="btn" value='Armonía' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Armonía' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/7/7e/Path_Harmony.png' alt='Armonía'/></button>
                                    <button type="button" className="btn" value='Nihilidad' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Nihilidad' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/4/45/Path_Nihility.png' alt='Nihilidad'/></button>
                                    <button type="button" className="btn" value='Conservación' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Conservación' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/3/37/Path_Preservation.png' alt='Conservación'/></button>
                                    <button type="button" className="btn" value='Abundancia' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Abundancia' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/9/94/Path_Abundance.png' alt='Abundancia'/></button>
                                    <button type="button" className="btn" value='Reminiscencia' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Reminiscencia' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/2/2f/Path_Remembrance.png' alt='Reminiscencia'/></button>
                                    <button type="button" className="btn" value='Exultación' onClick={(e) => setParam('path', e.currentTarget.value)} style={ path === 'Exultación' ? { outline: '2px solid var(--accent)'} : {} }><img style={{width:'100%', height: '100%'}} src='https://static.wikia.nocookie.net/houkai-star-rail/images/4/4d/Path_Elation.png' alt='Exultación'/></button>
                                </div>
                            </div>

                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--text-primary)', marginRight: 8, fontFamily: 'MilkyLemon, sans-serif'}}>Rareza</div>
                                <div>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
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
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--text-primary)' }} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
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
