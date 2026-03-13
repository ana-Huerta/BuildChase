import React from 'react'

export default function GenshinWeaponModal({ weapon, onClose }) {
  if (!weapon) return null

  const { name, weaponType, description, rarity, imageFull, iconImage, recommendedCharacters = [], stats = {}, refinement = {} } = weapon

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left">
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '100%', borderRadius: 8, height: '100%' }} />
          </div>

          <div className="hc-right">
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· {weaponType} · {rarity}★</span></h2>

            <div className="hc-block">
              <div className="hc-block-title">Descripción</div>
              <div className="hc-block-content">
                <div style={{ marginTop: 8, color: 'var(--text-secondary)' }}>{description}</div>
              </div>
            </div>

            <div className="hc-block">
              <div className="hc-block-title">Stats</div>
              <div className="hc-block-content">
                <div className="hc-stat-grid">
                  {Object.keys(stats).length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay stats</div>}
                  {Object.entries(stats).map(([k, v]) => (
                    <div key={k}><strong>{k}</strong><div>{v}</div></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hc-block">
              <div className="hc-block-title">Refinamiento</div>
              <div className="hc-block-content">
                {Object.keys(refinement).length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay refinamientos</div>}
                {Object.entries(refinement).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 8 }}>
                    <div style={{ fontWeight: 700 }}>{k}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hc-block span2">
              <div className="hc-block-title">Personajes Recomendados</div>
              <div className="hc-block-content">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {recommendedCharacters.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay recomendaciones</div>}
                  {recommendedCharacters.map((c, idx) => (
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
  )
}
