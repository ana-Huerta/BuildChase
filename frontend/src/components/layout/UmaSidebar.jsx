import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UmaSidebar() {
  const linkClass = ({ isActive }) => isActive ? 'hc-nav-item active' : 'hc-nav-item'

  return (
    <div className="hc-uma-sidebar" aria-hidden={false}>
      <nav className="hc-main-nav">

        <NavLink to="/uma" className={linkClass} end>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Characters.png' alt='Umamusume' />
            Personajes
          </div>
        </NavLink>

        <NavLink to="/uma/cards" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Cards.png' alt='Cards' />
            Cartas
          </div>
        </NavLink>

        <NavLink to="/uma/skills" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='/images/Skills.png' alt='Skills' />
            Skills
          </div>
        </NavLink>
      </nav>
    </div>
  )
}
