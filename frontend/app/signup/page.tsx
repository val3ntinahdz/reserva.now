'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service' 

export default function SignUpPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'client' | 'provider'>('client')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!nombre || !email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const newUser = await authService.signup({
        nombre: nombre,
        email,
        password,
        userType: 'client'
      })

      const displayName = (newUser as any).nombre || (newUser as any).name || nombre


      alert(`¡Registro exitoso, ${displayName}! Ahora, por favor, inicia sesión.`)
      router.push('/login')
    } catch (err: any) {

      console.error(err)
      setError(err.message || 'Error al crear la cuenta.')
    }
  }


  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <h1 className='text-3xl font-bold text-center'>Crear Cuenta</h1>
      </div>

      <div className='max-w-md mx-auto p-6'>
        {/* User Type Selector */}
        {/* ... (Tu JSX para el selector de tipo de usuario queda igual) ... */}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
          
          {/* 9. Mostrar error si existe */}
          {error && (
            <div className='mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md'>
              {error}
            </div>
          )}

          <div className='mb-5'>
            <label htmlFor='name' className='block text-sm font-medium mb-2 text-gray-900'>
              Nombre
            </label>
            <input
              type='text'
              id='name'
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              placeholder='Tu nombre completo'
              required
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-900'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
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
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              placeholder='••••••••'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-[#e79c26] text-white py-3 rounded-lg font-semibold'
          >
            Crear Cuenta
          </button>
        </form>

        
      </div>
    </div>
  )
}