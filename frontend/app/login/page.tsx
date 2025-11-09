'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service' // <-- 1. IMPORTAR SERVICIO

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'client' | 'provider'>('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null) // <-- 2. AÑADIR ESTADO DE ERROR

  // --- INICIO DE CORRECCIÓN ---

  // 3. REEMPLAZAR handleLogin con lógica REAL
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Limpiar errores

    try {
      // 4. Llamar al servicio real
      const response = await authService.login({ email, password, userType })

      // 'response' contiene { id, nombre, email, token, ... }
      // El servicio (auth.service.ts) ya guardó todo en localStorage

      alert(`¡Bienvenido, !`)

      // 5. Redirigir
      // OJO: El backend no devuelve 'userType', así que usamos el selector del UI
      if (userType === 'client') {
        router.push('/')
      } else {
        router.push('/profesional-dashboard')
      }
    } catch (err: any) {
      // 6. Manejar errores de la API
      console.error(err)
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    }
  }

  // --- FIN DE CORRECCIÓN ---

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <h1 className='text-3xl font-bold text-center'>Iniciar Sesión</h1>
      </div>

      <div className='max-w-md mx-auto p-6'>
        {/* User Type Selector */}
        {/* ... (Tu JSX para el selector de tipo de usuario queda igual) ... */}
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
          
          {/* 7. Mostrar error si existe */}
          {error && (
            <div className='mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md'>
              {error}
            </div>
          )}

          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-900'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email} // Conectado
              onChange={(e) => setEmail(e.target.value)} // Conectado
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none text-gray-900'
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
              value={password} // Conectado
              onChange={(e) => setPassword(e.target.value)} // Conectado
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none text-gray-900'
              placeholder='••••••••'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-[#e79c26] text-white py-3 rounded-lg font-semibold hover:bg-[#ffc87c] transition-colors'
          >
            Iniciar Sesión
          </button>

          <div className='mt-4 text-center'>
            <Link href='/forgot-password' className='text-sm text-[#e79c26] hover:text-[#ffc87c] font-medium'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>

        {/* Sign Up Link */}
        {/* ... (Tu JSX para el link de signup queda igual) ... */}
      </div>
    </div>
  )
}