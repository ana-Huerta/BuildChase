import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeLanding(){
  const wrapperStyle = {
    position: 'relative',
    color: '#fff',
    backgroundImage: 'url(/images/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    }

  return (
    <div style={wrapperStyle}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />

      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
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
          <h2 className="page-title" style={{ textAlign: 'center', marginTop: 24, fontFamily: 'LemonMilk, sans-serif'}}>Bienvenido a BuildChaser</h2>
        </div>
      </section>

      <section className="container" style={{ padding: '36px 28px', position: 'relative', zIndex: 1 }}>
        <div className="services-row">
          <NavLink to="/genshin" className="img-icon">
            <div style={{ height: 150, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/Genshin_Impact.jpg" alt="Genshin Impact" style={{ maxHeight: '100%', maxWidth: '100%', padding: '10%'}} />
              <p className='img-icon-title'>Genshin Impact</p>
            </div>
          </NavLink>

          <NavLink to="/honkai" className="img-icon">
            <div style={{ height: 150, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/Honkai_Star_Rail.jpg" alt="Honkai Star Rail" style={{ maxHeight: '100%', maxWidth: '100%', padding: '10%'}} />
              <p className='img-icon-title'>Honkai Star Rail</p>
            </div>
          </NavLink>

          <NavLink to="/uma" className="img-icon">
            <div style={{ height: 150, alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <img src="/images/umamusume.png" alt="Umamusume" style={{ maxHeight: '100%', maxWidth: '100%', padding: '10%'}} />
              <p className='img-icon-title'>Umamusume</p>
              <p className='img-icon-title'>Pretty Derby</p>
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  )
}
