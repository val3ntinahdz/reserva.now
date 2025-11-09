'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'client' | 'provider'>('client')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate signup
    if (fullName && email && password) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('userType', userType)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', fullName)
      
      alert(`Cuenta creada exitosamente como ${userType === 'client' ? 'Cliente' : 'Proveedor de Servicios'}`)
      
      // Redirect based on user type
      if (userType === 'client') {
        router.push('/')
      } else {
        router.push('/profesional-dashboard')
      }
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <h1 className='text-3xl font-bold text-center'>Crear Cuenta</h1>
      </div>

      <div className='max-w-md mx-auto p-6'>
        {/* User Type Selector */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6'>
          <p className='text-sm text-gray-700 mb-4 text-center font-medium'>¿Cómo deseas registrarte?</p>
          <div className='grid grid-cols-2 gap-4'>
            <button
              type='button'
              onClick={() => setUserType('client')}
              className={`p-5 rounded-lg border-2 transition-all ${
                userType === 'client'
                  ? 'border-[#e79c26] bg-[#ffedd5]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-10 h-10 mx-auto mb-2 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className='font-semibold text-sm text-gray-900'>Cliente</div>
              <div className='text-xs text-gray-600 mt-1'>Buscar servicios</div>
            </button>
            <button
              type='button'
              onClick={() => setUserType('provider')}
              className={`p-5 rounded-lg border-2 transition-all ${
                userType === 'provider'
                  ? 'border-[#e79c26] bg-[#ffedd5]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-10 h-10 mx-auto mb-2 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className='font-semibold text-sm text-gray-900'>Proveedor</div>
              <div className='text-xs text-gray-600 mt-1'>Ofrecer servicios</div>
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
          <div className='mb-5'>
            <label htmlFor='fullName' className='block text-sm font-medium text-gray-900 mb-2'>
              Nombre completo
            </label>
            <input
              type='text'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none'
              placeholder='Juan Pérez'
              required
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-900 mb-2'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none'
              placeholder='tu@email.com'
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-900 mb-2'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none'
              placeholder='••••••••'
              required
              minLength={6}
            />
            <p className='text-xs text-gray-600 mt-2'>Mínimo 6 caracteres</p>
          </div>

          {userType === 'provider' && (
            <div className='mb-6 p-4 bg-[#ffedd5] border border-[#e79c26]/30 rounded-lg flex gap-3'>
              <svg className="w-5 h-5 text-[#e79c26] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className='text-sm text-[#312311]'>
                Como proveedor, podrás crear tu perfil profesional y ofrecer tus servicios después de registrarte.
              </p>
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-[#e79c26] text-white py-3 rounded-lg font-semibold hover:bg-[#ffc87c] transition-colors'
          >
            Crear Cuenta
          </button>

          <p className='text-xs text-gray-600 text-center mt-4'>
            Al crear una cuenta, aceptas nuestros{' '}
            <Link href='/terms' className='text-[#e79c26] hover:text-[#ffc87c] font-medium'>
              Términos y Condiciones
            </Link>
          </p>
        </form>

        {/* Login Link */}
        <div className='mt-6 text-center bg-white rounded-lg shadow-sm border border-gray-100 p-5'>
          <p className='text-gray-700 text-sm mb-2'>¿Ya tienes una cuenta?</p>
          <Link
            href='/login'
            className='inline-block text-[#e79c26] font-semibold hover:text-[#ffc87c] transition-colors'
          >
            Iniciar sesión →
          </Link>
        </div>
      </div>
    </div>
  )
}