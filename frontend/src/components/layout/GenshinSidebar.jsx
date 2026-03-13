import React from 'react'
import { NavLink } from 'react-router-dom'

export default function GenshinSidebar() {
  const linkClass = ({ isActive }) => isActive ? 'hc-nav-item active' : 'hc-nav-item'

  return (
    <div className="hc-sidebar" aria-hidden={false}>
      <nav className="hc-main-nav">

        <NavLink to="/genshin" className={linkClass} end>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Genshin_Character.png' alt='Genshin' />
            Personajes
          </div>
        </NavLink>

        <NavLink to="/genshin/weapons" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Genshin_Weapon.png' alt='Weapons' />
            Armas
          </div>
        </NavLink>

        <NavLink to="/genshin/artifacts" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Genshin_Artifact.png' alt='Artifacts' />
            Artefactos
          </div>
        </NavLink>

      </nav>
    </div>
  )
}
