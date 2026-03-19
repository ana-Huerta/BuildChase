import React from 'react'

export default function UmaCharacterModal({ character, onClose }) {
  if (!character) return null

  const { name, rarity, imageFull, iconImage, tracks = [], distances = {}, styles = {}, stats = {}, cardSet = [] } = character

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-uma" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left" >
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '60%', borderRadius: 8, height: '100%', transform: 'translateX(30%)' }} />
          </div>

          <div className='hc-right' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· Rareza: {rarity}★</span></h2>

            <div className="hc-right-grid">
              <div className="hc-block">
                <div className="hc-block-title">Pistas</div>
                <div className="hc-block-content">
                  {tracks.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay pistas</div>}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {tracks.map((t, i) => <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 6 }}>{t.dirt || t.turf || t}</div>)}
                  </div>
                </div>
              </div>

              <div className="hc-block">
                <div className="hc-block-title">Distancias</div>
                <div className="hc-block-content">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Object.keys(distances).length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay distancias</div>}
                    {Object.entries(distances).map(([k, v]) => {
                      let display = ''
                      if (v && typeof v === 'object') {
                        // v may contain sub-values like sprint, mile, medium, long or an _id
                        display = Object.entries(v)
                          .filter(([subk, subv]) => subk !== '_id' && (subv || subv === 0))
                          .map(([subk, subv]) => {
                            if (subv && typeof subv === 'object') return Object.values(subv).filter(Boolean).join(', ')
                            return String(subv)
                          })
                          .filter(Boolean)
                          .join(' · ')
                      } else {
                        display = v
                      }

                      return (
                        <div key={k} style={{ minWidth: 120 }}>
                          <div style={{ fontWeight: 700 }}>{k}</div>
                          <div style={{ color: 'var(--text-secondary)' }}>{display}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Estilos</div>
                <div className="hc-block-content">
                  {Object.keys(styles).length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay estilos</div>}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Object.entries(styles).map(([k, v]) => {
                      const value = v && typeof v === 'object' ? Object.values(v).filter(Boolean).join(', ') : v
                      return (
                        <div key={k} style={{ minWidth: 140 }}>
                          <div style={{ fontWeight: 700 }}>{k}</div>
                          <div style={{ color: 'var(--text-secondary)' }}>{value}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Stats</div>
                <div className="hc-block-content">
                  {Object.keys(stats).length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay stats</div>}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Object.entries(stats).map(([k, v]) => (
                      <div key={k} style={{ minWidth: 120 }}>
                        <div style={{ fontWeight: 700 }}>{k}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Cartas</div>
                <div className="hc-block-content">
                  {cardSet.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay cartas</div>}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {cardSet.map((c, idx) => (
                      <div key={c._id || c || idx} style={{ textAlign: 'center' }}>
                        <img src={c.iconImage || '/service-placeholder.svg'} alt={c.name || c} style={{ width: 48, height: 48, borderRadius: 6 }} />
                        <div style={{ fontSize: 12 }}>{c.name || c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
