import React from 'react'

export default function HonkaiCharacterModal({ character, onClose }) {
  if (!character) return null

  const { name, element, path, principalRole, rarity, imageFull, iconImage, stats = {}, relicAttributes = {}, artifactSets = [], recommendedLightcones = [], traces = [] } = character

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left" >
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '100%', borderRadius: 8, height: '100%' }} />
          </div>

          <div className="hc-right">
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· {path} · {principalRole}</span></h2>

            <div className="hc-right-grid">
              <div className="hc-block">
                <div className="hc-block-title">Stats de Referencia</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div><strong>Vida</strong><div className="hc-stat-value">{stats.hp ?? '---'}</div></div>
                    <div><strong>Prob. Crítico</strong><div className="hc-stat-value">{stats.critRate ? stats.critRate + '%' : '---'}</div></div>
                    <div><strong>Ataque</strong><div className="hc-stat-value">{stats.attack ?? '---'}</div></div>
                    <div><strong>Daño Crítico</strong><div className="hc-stat-value">{stats.critDamage ? stats.critDamage + '%' : '---'}</div></div>
                    <div><strong>Defensa</strong><div className="hc-stat-value">{stats.defense ?? '---'}</div></div>
                    <div><strong>Velocidad</strong><div className="hc-stat-value">{stats.speed ?? '---'}</div></div>
                  </div>
                </div>
              </div>

              <div className="hc-block">
                <div className="hc-block-title">Conoz de Luz Recomendados</div>
                <div className="hc-block-content hc-lc-grid">
                  {recommendedLightcones.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay conos de luz</div>}
                  {recommendedLightcones.map((l, idx) => (
                    <div key={l._id || l || idx} className="hc-lc">
                      <img src={l.imageFull || l.iconImage || '/service-placeholder.svg'} alt={l.name || l} />
                      <div className="hc-lc-name">{l.name || l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-block">
                <div className="hc-block-title">Eidolon · Talento</div>
                <div className="hc-block-content">
                  {traces.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay talentos</div>}
                  {traces.map((t, idx) => (
                    <div key={t._id || idx} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700 }}>{t.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Top 3 Sets</div>
                <div className="hc-block-content">
                  {artifactSets.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay sets recomendados</div>}
                  {artifactSets.map((a, idx) => (
                    <div key={a._id || a || idx} style={{ marginBottom: 10 }}>
                      <div style={{ fontWeight: 700 }}>{a.name || a}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{a.description1 || a.description || ''}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Puedes llevarlo con:</div>
                <div className="hc-block-content">
                  <div style={{ color: 'var(--text-secondary)' }}>Team recommendations and combos go here.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
