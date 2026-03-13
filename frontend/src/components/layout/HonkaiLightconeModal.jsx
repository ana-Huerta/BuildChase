import React from 'react'

export default function HonkaiLightconeModal({ lightcone, onClose }) {
  if (!lightcone) return null

  const { name, description, path, rarity, imageFull, stats = {}, superpositionEffects = {}, recommendedCharacters = [] } = lightcone

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left" >
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '50%', borderRadius: 8, height: '100%', transform: 'translateX(40%)'}} />
          </div>

          <div className="hc-right">
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· {path} · {rarity}★</span></h2>

            <div style={{ marginTop: 12 }}>{description}</div>

            <div className="hc-block">
                <div className="hc-block-title">Stats</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <div><strong>Vida</strong><div>{stats.hp ?? '---'}</div></div>
                        <div><strong>Ataque</strong><div>{stats.attack ?? '---'}</div></div>
                        <div><strong>Defensa</strong><div>{stats.defense ?? '---'}</div></div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="hc-block">
                <div className="hc-block-title">Efectos de Superposición</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <ul style={{ color: 'var(--text-secondary)' }}>
                            {Object.values(superpositionEffects).filter(Boolean).length === 0 && <li>No hay efectos descritos</li>}
                            {Object.values(superpositionEffects).map((v, i) => v ? <li key={i}>{v}</li> : null)}
                        </ul>
                    </div>
                  </div>
                </div>
            </div>

            <div className="hc-block">
                <div className="hc-block-title">Personajes Recomendados</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
    </div>
  )
}
