import React from 'react'

export default function ServiceLightconeCard({ title, subtitle, image = '/service-placeholder.svg', className = '', tile = false, onClick }) {
  if (tile) {
    return (
      <div onClick={onClick} className={"card tile-card service-lightcone-card " + className} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <img src={image} alt={title} className="service-img service-lightcone-card-img" />
        <div style={{ marginTop: 8 }}>
          <h3 className="card-title">{title}</h3>
          <p className="card-sub">{subtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} className={"card list-card " + className} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <img src={image} alt={title} className="service-img list-img" />

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="card-title">{title}</h3>
              <p className="card-sub">{subtitle}</p>
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
              <div>★★★★★</div>
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 8 }}>❤ --</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 8 }}>⚔ --</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 8 }}>🛡 --</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 8 }}>🔧 --</div>
          </div>
        </div>
      </div>
    </div>
  )
}
