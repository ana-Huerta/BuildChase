import React from 'react'

export default function ServiceCard({ title, subtitle, image = '/service-placeholder.svg', className = '' }) {
  return (
    <div className={"card " + className}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <img src={image} alt={title} className="service-img" />
        <div style={{ flex: 1 }}>
          <h3 className="card-title">{title}</h3>
          <p className="card-sub">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
