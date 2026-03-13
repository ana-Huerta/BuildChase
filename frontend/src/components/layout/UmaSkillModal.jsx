import React from 'react'

export default function UmaSkillModal({ skill, onClose }) {
  if (!skill) return null

  const { name, description, type, cost, iconImage } = skill

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-uma" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
            <div className='hc-left'>
                <img src={iconImage || '/service-placeholder.svg'} alt={name} style={{ width: '45%', height: '100%', borderRadius: 8, transform: 'translateX(70%)' }} />
            </div>

            <div className='hc-right' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h2 style={{ margin: 0 }}>{name}</h2>

                <div className="hc-block">
                    <div className="hc-block-title">Descripción</div>
                    <div className="hc-block-content">
                        <div className="hc-stat-grid">
                            <div style={{ marginTop: 12 }}>{description}</div>
                        </div>
                    </div>
                </div>

                <div className="hc-block">
                    <div className="hc-block-title">Costo Base</div>
                    <div className="hc-block-content">
                        <div className="hc-stat-grid">
                            <div style={{ marginTop: 12 }}>{cost}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
