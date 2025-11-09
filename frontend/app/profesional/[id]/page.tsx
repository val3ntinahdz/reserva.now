'use client'

import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'
import { getProfessionalDetails } from '@/data/professionalDetails'
import { use, useMemo } from 'react'

export default function ProfesionalPage ({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const professionalId = parseInt(resolvedParams.id)

  const professional = useMemo(() => {
    for (const category of categories) {
      const found = category.profesionales.find(p => p.id === professionalId)
      if (found) {
        return getProfessionalDetails(found)
      }
    }
    return null
  }, [professionalId])

  if (!professional) {
    return (
      <div className='min-h-screen pb-20 bg-white'>
        <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
          <h1 className='text-2xl font-bold'>Profesional no encontrado</h1>
        </header>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-20 bg-white'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <button
          onClick={() => router.back()}
          className='inline-flex items-center gap-2 mb-3 text-[#312311]/80 hover:text-[#312311]'
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden'>
            <img src={professional.imagen} alt={professional.nombre} className='w-full h-full object-contain p-3' />
          </div>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{professional.nombre}</h1>
            <p className='text-sm text-[#312311]/80'>{professional.especialidad}</p>
          </div>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className='text-lg font-bold text-gray-900'>{professional.calificacion}</span>
              <span className='text-sm text-gray-700'>({professional.resenas} reseñas)</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              professional.disponible
                ? 'bg-[#ffedd5] text-[#e79c26]'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {professional.disponible ? 'Disponible' : 'Ocupado'}
            </span>
          </div>
          <p className='text-gray-700 leading-relaxed'>{professional.descripcion}</p>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <svg className="w-5 h-5 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Información General</span>
          </h2>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <span className='text-gray-700 text-sm w-24 flex-shrink-0'>Experiencia:</span>
              <span className='text-gray-900 font-medium'>{professional.experiencia}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-700 text-sm w-24 flex-shrink-0'>Precio:</span>
              <span className='text-[#e79c26] font-bold'>{professional.precio}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-700 text-sm w-24 flex-shrink-0'>Ubicación:</span>
              <span className='text-gray-900'>{professional.direccion} • {professional.distancia}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-700 text-sm w-24 flex-shrink-0'>Horario:</span>
              <span className='text-gray-900'>{professional.horario}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-700 text-sm w-24 flex-shrink-0'>Teléfono:</span>
              <a href={`tel:${professional.telefono}`} className='text-[#e79c26] hover:underline'>{professional.telefono}</a>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <svg className="w-5 h-5 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Modalidad de Servicio</span>
          </h2>
          <div className='flex flex-wrap gap-2'>
            {(professional.modalidad || []).map((mod, index) => (
              <span key={index} className='px-3 py-1 bg-[#ffedd5] text-[#e79c26] rounded-full text-sm'>
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <svg className="w-5 h-5 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Servicios Ofrecidos</span>
          </h2>
          <ul className='space-y-2'>
            {(professional.servicios || []).map((servicio, index) => (
              <li key={index} className='flex items-center gap-2 text-gray-700'>
                <svg className="w-4 h-4 text-[#e79c26]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{servicio}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-3 sticky bottom-20 bg-white py-3'>
          <button
            onClick={() => router.push(`/reservar/${professionalId}`)}
            className='flex-1 bg-[#e79c26] text-white py-3 rounded-lg font-semibold hover:bg-[#ffc87c] transition-colors flex items-center justify-center gap-2'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Reservar Cita</span>
          </button>
          <a
            href={`tel:${professional.telefono}`}
            className='px-6 bg-[#312311] text-white py-3 rounded-lg font-semibold hover:bg-[#312311]/90 transition-colors flex items-center justify-center gap-2'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Llamar</span>
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}