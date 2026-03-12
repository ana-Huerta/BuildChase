import React from 'react'
import ServiceCard from '../../components/ui/ServiceCard'

const sample = [
  { id: 1, title: 'Silver Wolf', subtitle: 'Path: Destruction' },
  { id: 2, title: 'March 7th', subtitle: 'Path: Harmony' },
]

export default function HonkaiPage() {
  return (
    <div className="theme-honkai" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Honkai Builds</h1>
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
