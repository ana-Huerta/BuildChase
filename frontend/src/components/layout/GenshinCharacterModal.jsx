import React from 'react'

export default function GenshinCharacterModal({ character, onClose }) {
  if (!character) return null

  const { name, element, weapon, principalRole, rarity, imageFull, iconImage, stats = {}, relicAttributes = {}, artifactSets = [], recommendedWeapons = [], talents = [] } = character

  return (
    <div className="hc-modal-overlay" onClick={onClose}>
      <div className="hc-modal-genshin" onClick={(e) => e.stopPropagation()}>
        <button className="hc-modal-close" onClick={onClose}>✕</button>

        <div className="hc-modal-inner">
          <div className="hc-left" >
            <img src={imageFull || '/service-placeholder.svg'} alt={name} style={{ width: '100%', borderRadius: 8, height: '100%' }} />
          </div>

          <div className='hc-right' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>· {weapon} · {principalRole}</span></h2>

            <div className="hc-right-grid">
              <div className="hc-block">
                <div className="hc-block-title">Stats de Referencia</div>
                <div className="hc-block-content">
                  <div className="hc-stat-grid">
                    <div><strong>Vida</strong><div className="hc-stat-value">{stats.hp ?? '---'}</div></div>
                    <div><strong>Ataque</strong><div className="hc-stat-value">{stats.attack ?? '---'}</div></div>
                    <div><strong>Defensa</strong><div className="hc-stat-value">{stats.defense ?? '---'}</div></div>
                    <div><strong>Prob. Crítico</strong><div className="hc-stat-value">{stats.critRate ? stats.critRate + '%' : '---'}</div></div>
                    <div><strong>Daño Crítico</strong><div className="hc-stat-value">{stats.critDamage ? stats.critDamage + '%' : '---'}</div></div>
                    <div><strong>ER</strong><div className="hc-stat-value">{stats.energyRecharge ? stats.energyRecharge + '%' : '---'}</div></div>
                  </div>
                </div>
              </div>

              <div className="hc-block">
                <div className="hc-block-title">Armas Recomendadas</div>
                <div className="hc-block-content hc-lc-grid">
                  {recommendedWeapons.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay armas recomendadas</div>}
                  {recommendedWeapons.map((w, idx) => (
                    <div key={w._id || w || idx} className="hc-lc">
                      <img src={w.imageFull || w.iconImage || '/service-placeholder.svg'} alt={w.name || w} />
                      <div className="hc-lc-name">{w.name || w}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-block">
                <div className="hc-block-title">Talentos</div>
                <div className="hc-block-content">
                  {talents.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No hay talentos</div>}
                  {talents.map((t, idx) => (
                    <div key={t._id || idx} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700 }}>{t.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-block span2">
                <div className="hc-block-title">Top Sets</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
