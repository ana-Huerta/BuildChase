import React from 'react'
import ServiceCard from '../../components/ui/ServiceCard'

const sample = [
  { id: 1, title: 'Special Week', subtitle: 'Type: Speed' },
  { id: 2, title: 'Silence Suzuka', subtitle: 'Type: Speed' },
]

export default function UmaPage() {
  return (
    <div className="theme-uma" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Uma Musume Builds</h1>
          <p className="page-sub">Minimalista y fácil de personalizar</p>
        </header>

        <main className="grid">
          {sample.map((s) => (
            <ServiceCard key={s.id} title={s.title} subtitle={s.subtitle} image={'/service-placeholder.svg'} />
          ))}
        </main>
      </div>
    </div>
  )
}
