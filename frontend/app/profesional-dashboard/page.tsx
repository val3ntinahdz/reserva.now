'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import ProviderDesktopNav from '@/components/ProviderDesktopNav'
import FinancialSummary from '@/components/FinancialSummary'
import { useAuth } from '@/hooks/useAuth'

export default function ProfesionalDashboard() {
  const router = useRouter()
  const { isLoading } = useAuth('provider')
  const [userName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Profesional'
    }
    return 'Profesional'
  })

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <svg className="w-12 h-12 mx-auto mb-4 text-[#e79c26] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className='text-gray-600'>Cargando...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    router.push('/login')
  }

  return (
    <div className='min-h-screen bg-white pb-20 md:pb-8'>
      <ProviderDesktopNav />
      <header className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold mb-2'>Panel de Proveedor</h1>
          <p className='text-[#312311]/80 text-lg'>Bienvenido, {userName}</p>
        </div>
      </header>

      <main className='p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto'>
        <FinancialSummary />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          <button className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left'>
            <svg className="w-10 h-10 text-[#e79c26] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className='font-semibold text-gray-900 mb-2'>Disponibilidad</h3>
            <p className='text-sm text-gray-600 mb-4'>Configurar horarios disponibles</p>
            <span className='text-[#e79c26] font-medium text-sm hover:text-[#ffc87c] inline-flex items-center gap-1'>
              Configurar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

        <Link href='/cuenta-proveedor/appointments' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
          <svg className="w-10 h-10 text-[#e79c26] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className='font-semibold text-gray-900 mb-2'>Mis Citas</h3>
          <p className='text-sm text-gray-600 mb-4'>Ver y gestionar tus citas programadas</p>
          <span className='text-[#e79c26] font-medium text-sm hover:text-[#ffc87c] inline-flex items-center gap-1'>
            Ver citas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href='/cuenta-proveedor/profile' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
          <svg className="w-10 h-10 text-[#e79c26] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className='font-semibold text-gray-900 mb-2'>Mi Perfil</h3>
          <p className='text-sm text-gray-600 mb-4'>Editar información profesional y servicios</p>
          <span className='text-[#e79c26] font-medium text-sm hover:text-[#ffc87c] inline-flex items-center gap-1'>
            Editar perfil
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        <Link href='/cuenta-proveedor/resumen' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
          <svg className="w-10 h-10 text-[#e79c26] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className='font-semibold text-gray-900 mb-2'>Resumen</h3>
          <p className='text-sm text-gray-600 mb-4'>Ver estadísticas financieras y transacciones</p>
          <span className='text-[#e79c26] font-medium text-sm hover:text-[#ffc87c] inline-flex items-center gap-1'>
            Ver Resumen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

        <div className='bg-[#ffedd5] border border-[#e79c26]/30 p-4 rounded-lg flex gap-3'>
          <svg className="w-5 h-5 text-[#e79c26] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className='text-sm text-[#312311]'>
            <strong>Tip:</strong> Completa tu perfil profesional para que los clientes puedan encontrarte más fácilmente.
          </p>
        </div>
      </main>

      <ProviderBottomNav />
    </div>
  )
}