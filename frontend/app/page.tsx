'use client'

import Link from 'next/link'
import Image from 'next/image'
import BottomNav from '@/components/BottomNav'
import DesktopNav from '@/components/DesktopNav'
import { categories } from '@/data/professionals'

export default function Home() {
  return (
    <div className='min-h-screen pb-20 md:pb-8 bg-white'>
      <DesktopNav />

      <main className='pb-4 max-w-7xl mx-auto mt-10'>
        <section className='mb-6'>
          <h2 className='text-xl font-bold text-[#312311] mb-4 px-4 md:px-6 lg:px-8'>Servicios Disponibles</h2>
          <div className='flex gap-3 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 md:px-6 lg:px-8 pb-2 scrollbar-hide'>
            {categories.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.id}`}
                className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all hover:border-[#e79c26] flex flex-col items-center min-w-[120px]'
              >
                <div className='w-20 h-20 bg-[#ffedd5] rounded-xl overflow-hidden mb-3 relative'>
                  <Image
                    src={categoria.profesionales[0].imagen}
                    alt={categoria.nombre}
                    fill
                    className='object-contain p-3'
                  />
                </div>
                <h3 className='font-bold text-[#312311] text-center text-sm'>{categoria.nombre}</h3>
                <p className='text-xs text-gray-700 mt-1'>{categoria.profesionales.length} disponible{categoria.profesionales.length > 1 ? 's' : ''}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className='px-4 md:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-[#312311]'>Próximas Citas</h2>
            <Link href='/citas' className='text-sm text-[#e79c26] font-medium'>
              Ver todas
            </Link>
          </div>
          
          <div className='space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0'>
            <Link
              href='/cita/1'
              className='block bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors'
            >
              <div className='flex justify-between items-start mb-2'>
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-900'>Dr. Juan Pérez</h3>
                  <p className='text-sm text-gray-600'>Medicina General</p>
                </div>
                <span className='px-3 py-1 rounded-full text-xs font-medium bg-[#ffc87c]/30 text-[#e79c26]'>
                  Confirmada
                </span>
              </div>
              <div className='flex items-center gap-1 text-sm text-gray-700 mb-1'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                15 nov, 2025, 10:00
              </div>
              <div className='flex items-center gap-1 text-sm text-gray-700'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                $500
              </div>
            </Link>

            <div className='text-center py-8 bg-gray-50 rounded-lg'>
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className='text-gray-700 text-sm'>No tienes más citas próximas</p>
              <Link href='/buscar' className='text-[#e79c26] text-sm font-medium mt-2 inline-block'>
                Buscar servicios
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
