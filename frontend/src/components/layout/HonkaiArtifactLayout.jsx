import React from 'react'
import HonkaiSidebar from './HonkaiSidebar'

export default function HonkaiArtifactLayout({ children }) {
  return (
    <div className="theme-honkai" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 20, height: '100vh' }}>
          <HonkaiSidebar />

          <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <section style={{ marginBottom: 20 }}>
              <div className="page-header">
              </div>
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
