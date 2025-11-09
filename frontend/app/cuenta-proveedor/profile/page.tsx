'use client'

import { useAuth } from '@/hooks/useAuth'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import ProviderDesktopNav from '@/components/ProviderDesktopNav'
import Link from 'next/link'
import { useState } from 'react'

export default function ProviderProfilePage() {
  const { isLoading } = useAuth('provider')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

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

  const menuItems = [
    { 
      id: 1, 
      titulo: 'Actualizar Perfil', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      descripcion: 'Edita tu información profesional', 
      href: '/provider/profile/update' 
    },
    { 
      id: 2, 
      titulo: 'Preferencias de Cita', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      descripcion: 'Configura tus preferencias de reserva', 
      href: '/provider/profile/preferences' 
    },
    { 
      id: 3, 
      titulo: 'Notificaciones', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
      descripcion: 'Configura tus alertas', 
      href: '/provider/profile/notifications' 
    },
    { 
      id: 4, 
      titulo: 'Interledger', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
      descripcion: 'Gestiona tu wallet y pagos', 
      href: '/provider/profile/interledger' 
    },
    { 
      id: 5, 
      titulo: 'Ayuda y Soporte', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      descripcion: 'Preguntas frecuentes y contacto', 
      href: '/provider/profile/help' 
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    window.location.href = '/login'
  }

  return (
    <div className='min-h-screen pb-20 md:pb-8 bg-white'>
      <ProviderDesktopNav />
      <header className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold mb-6'>Mi Perfil</h1>
          <div className='flex items-center space-x-4'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center'>
              <svg className="w-9 h-9 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-lg'>{localStorage.getItem('userName') || 'Profesional'}</p>
              <p className='text-sm text-[#312311]/80'>{localStorage.getItem('userEmail') || 'profesional@email.com'}</p>
            </div>
          </div>
        </div>
      </header>

      <main className='p-4 md:p-6 lg:p-8 max-w-7xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full p-5 flex items-center space-x-4 hover:bg-gray-50 transition-colors block ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className='text-[#e79c26]'>{item.icon}</div>
              <div className='flex-1 text-left'>
                <p className='font-medium text-gray-900'>{item.titulo}</p>
                <p className='text-sm text-gray-600 mt-1'>{item.descripcion}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className='mt-4'>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className='w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:bg-red-50 transition-colors text-red-600'
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <div className='flex-1 text-left'>
              <p className='font-medium'>Cerrar Sesión</p>
            </div>
          </button>
        </div>

        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>Versión 1.0.0</p>
        </div>
      </main>

      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full'>
            <h3 className='text-lg font-semibold mb-2'>¿Cerrar sesión?</h3>
            <p className='text-gray-600 mb-6'>¿Estás seguro que deseas cerrar tu sesión?</p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <ProviderBottomNav />
    </div>
  )
}