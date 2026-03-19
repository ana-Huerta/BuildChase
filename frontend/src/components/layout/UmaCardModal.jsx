import React from 'react'

export default function UmaCardModal({ card, onClose }) {
  if (!card) return null

  const { name, uniquePerk, type, rarity, imageFull, iconImage, styles = [], skills = [], effects = [] } = card

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-uma" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left" >
            <img src={imageFull || iconImage || '/service-placeholder.svg'} alt={name} style={{ width: '50%', borderRadius: 8, height: '100%', transform: 'translateX(40%)'}} />
          </div>

          <div className='hc-right' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· {type || ''} · {rarity || ''}</span></h2>

            <div style={{ marginTop: 12 }}>{uniquePerk}</div>

            <div className="hc-block">
              <div className="hc-block-title">Estilos</div>
              <div className="hc-block-content">
                {styles.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay estilos</div>}
                {styles.map((s, idx) => (
                  <div key={idx} style={{ marginBottom: 8 }}>
                    {typeof s === 'string' ? s : Object.values(s).filter(Boolean).join(', ')}
                  </div>
                ))}
              </div>
            </div>

            <div className="hc-block">
              <div className="hc-block-title">Skills</div>
              <div className="hc-block-content">
                {skills.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay skills</div>}
                {skills.map((sk, i) => (
                  <div key={sk._id || i} style={{ marginBottom: 8 }}>
                    <strong>{sk.name || sk}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="hc-block">
              <div className="hc-block-title">Efectos</div>
              <div className="hc-block-content">
                {effects.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay efectos</div>}
                {effects.map((e, i) => (
                  <div key={i} style={{ marginBottom: 6 }}>{e}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
