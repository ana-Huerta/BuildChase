import React from 'react'
import GenshinSidebar from './GenshinSidebar'

export default function GenshinArtifactLayout({ children }) {
  return (
    <div className="theme-genshin" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 20, height: '100vh' }}>
          <GenshinSidebar />

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
