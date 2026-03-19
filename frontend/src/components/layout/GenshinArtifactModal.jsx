import React from 'react'

export default function GenshinArtifactModal({ artifact, onClose }) {
  if (!artifact) return null

  const { name, description1, description2, imageFull, recommendedCharacters = [] } = artifact

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-genshin" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left">
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '100%', borderRadius: 8, height: '100%' }} />
          </div>

          <div className='hc-right' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ margin: 0 }}>{name}</h2>

            <div className="hc-block">
                <div className="hc-block-title">2 Piezas</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div style={{ marginTop: 12 }}>{description1}</div>
                  </div>
                </div>
            </div>

            <div className="hc-block">
                <div className="hc-block-title">4 Piezas</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    {description2 && <div style={{ marginTop: 8, color: 'var(--text-secondary)' }}>{description2}</div>}
                  </div>
                </div>
            </div>

            <div className="hc-block">
                <div className="hc-block-title">Personajes Recomendados</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
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
    </div>
  )
}
