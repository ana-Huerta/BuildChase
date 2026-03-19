import React from 'react'
import { NavLink } from 'react-router-dom'
import {Flame} from 'lucide-react'

export default function HomeLanding(){
  const bgStyle = { backgroundImage: 'url(/images/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }

  return (
    <div className="hero" style={bgStyle}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />

      <section style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div className="libro">
            <div className='book'>
              <span className='page turn'></span>
              <span className='page turn'></span>
              <span className='page turn'></span>
              <span className='page turn'></span>
              <span className='page turn'></span>
              <span className='page turn'></span>
              <span className='cover'></span>
              <span className='page'></span>
              <span className='cover turn'></span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: 8, fontFamily: 'LemonMilk, sans-serif', fontSize: 30, color: 'var(--uma-secondary)'}}><Flame size={30}/> Bienvenido a BuildChaser<Flame size={30} /></h2>
            <p style={{ marginTop: 8 }}>Explora builds, equipo y guías organizadas por juego.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{padding: '2%', position: 'relative', zIndex: 1, marginTop: 28, marginBottom: 64 }}>
        <div className="grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
          <NavLink to="/genshin" className="service-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <img src="/images/Genshin_Impact.jpg" alt="Genshin Impact" className="service-img" />
              <div className="card-title">Genshin Impact</div>
            </div>
          </NavLink>

          <NavLink to="/honkai" className="service-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <img src="/images/Honkai_Star_Rail.jpg" alt="Honkai Star Rail" className="service-img" />
              <div className="card-title">Honkai Star Rail</div>
            </div>
          </NavLink>

          <NavLink to="/uma" className="service-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <img src="/images/umamusume.png" alt="Umamusume" className="service-img" />
              <div className="card-title">Umamusume: Pretty Derby</div>
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  )
}
