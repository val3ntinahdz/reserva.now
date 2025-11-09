'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DesktopNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path
  
  return (
    <nav className="hidden md:block bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#e79c26] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-[#312311]">Reserva.Now</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-[#e79c26] bg-[#ffedd5]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-sm font-medium">Inicio</span>
            </Link>
            
            <Link
              href="/buscar"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/buscar') 
                  ? 'text-[#e79c26] bg-[#ffedd5]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">Buscar</span>
            </Link>
            
            <Link
              href="/citas"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/citas') 
                  ? 'text-[#e79c26] bg-[#ffedd5]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Citas</span>
            </Link>
            
            <Link
              href="/cuenta-cliente"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/cuenta-cliente') 
                  ? 'text-[#e79c26] bg-[#ffedd5]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">Perfil</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
