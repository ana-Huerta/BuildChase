import React from 'react'

export default function Footer(){
  return (
    <footer style={{backgroundColor: 'var(--primary)', color: 'var(--text-primary)'}}>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex-1">
            <div style={{fontFamily: 'LemonMilk, sans-serif'}}>BuildChaser</div>
            <p className="mt-2" style={{fontFamily: 'LemonMilk, sans-serif', fontSize: '10px'}}>Guías de una fan para fans de Genshin, Honkai y Umamusume.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center" style={{fontFamily: 'LemonMilk, sans-serif', fontSize: '15px'}}>© {new Date().getFullYear()} BuildChaser. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}
