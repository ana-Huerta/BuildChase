import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HonkaiSidebar() {
  const linkClass = ({ isActive }) => isActive ? 'hc-nav-item active' : 'hc-nav-item'

  return (
    <div className="hc-sidebar" aria-hidden={false}>
      <nav className="hc-main-nav">

        <NavLink to="/honkai" className={linkClass} end>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='https://www.pngall.com/wp-content/uploads/17/Honkai-Star-Rail-Logo-Symbolic-Representation-PNG.png'></img>
            Personajes
        </div>
        </NavLink>

        <NavLink to="/honkai/lightcones" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='https://www.pngall.com/wp-content/uploads/17/Honkai-Star-Rail-Logo-Visual-Representation-PNG.png'></img>
            Conos de Luz
        </div>
        </NavLink>

        <NavLink to="/honkai/artifacts" className={linkClass}>
          <div style={{height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row', gap: 12, fontFamily: 'LemonMilk, sans-serif', fontSize: 15}}>
            <img style={{ maxHeight: '100%', maxWidth: '100%'}} src='https://www.pngall.com/wp-content/uploads/17/Honkai-Star-Rail-Logo-Signature-Graphic-PNG.png'></img>
            Artefactos
          </div>
        </NavLink>
      </nav>
    </div>
  )
}
