'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import ProviderDesktopNav from '@/components/ProviderDesktopNav'
import Link from 'next/link'

export default function ProviderAppointmentsPage() {
  const { isLoading } = useAuth('provider')
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null)
  const [showAllHours, setShowAllHours] = useState(false)

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

  // Generate week dates
  const generateWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('es-MX', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('es-MX', { month: 'short' })
      })
    }
    return dates
  }

  const weekDates = generateWeekDates()

  // Time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  // Mock appointments data mapped to calendar
  const appointments = [
    {
      id: 1,
      clientName: 'María González',
      service: 'Corte de cabello',
      date: weekDates[2].date,
      time: '10:00',
      status: 'Pendiente',
      price: 450,
      location: 'A domicilio',
      phone: '555-0101'
    },
    {
      id: 2,
      clientName: 'Carlos Ramírez',
      service: 'Reparación de laptop',
      date: weekDates[2].date,
      time: '14:00',
      status: 'Confirmada',
      price: 1200,
      location: 'En consultorio',
      phone: '555-0102'
    },
    {
      id: 3,
      clientName: 'Ana Martínez',
      service: 'Limpieza profunda',
      date: weekDates[3].date,
      time: '09:00',
      status: 'Pendiente',
      price: 800,
      location: 'A domicilio',
      phone: '555-0103'
    },
    {
      id: 4,
      clientName: 'Luis Hernández',
      service: 'Masaje terapéutico',
      date: weekDates[4].date,
      time: '16:00',
      status: 'Pendiente',
      price: 650,
      location: 'En consultorio',
      phone: '555-0104'
    },
    {
      id: 5,
      clientName: 'Patricia López',
      service: 'Consulta nutricional',
      date: weekDates[1].date,
      time: '11:00',
      status: 'Confirmada',
      price: 500,
      location: 'En consultorio',
      phone: '555-0105'
    }
  ]

  const getAppointmentForSlot = (date: string, time: string) => {
    return appointments.find(apt => apt.date === date && apt.time === time)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-[#e79c26] text-white'
      case 'Pendiente':
        return 'bg-[#ffc87c] text-[#312311]'
      case 'Completada':
        return 'bg-[#312311] text-white'
      case 'Cancelada':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const selectedApt = appointments.find(apt => apt.id === selectedAppointment)

  return (
    <div className='min-h-screen pb-20 md:pb-8 bg-white'>
      <ProviderDesktopNav />
      <header className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <div className='max-w-7xl mx-auto'>
          <Link href='/profesional-dashboard' className='inline-flex items-center gap-2 mb-6 text-[#312311]/80 hover:text-[#312311]'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className='text-3xl md:text-4xl font-bold'>Mis Citas</h1>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        {/* Summary */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center'>
            <p className='text-2xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Confirmada').length}</p>
            <p className='text-xs text-gray-600 mt-1'>Confirmadas</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center'>
            <p className='text-2xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Pendiente').length}</p>
            <p className='text-xs text-gray-600 mt-1'>Pendientes</p>
          </div>
        </div>

        {/* Calendar Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-6 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-900 text-lg'>
              Calendario de Citas
            </h2>
          </div>
          
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full'>
              {/* Header with days */}
              <div className='flex border-b border-gray-200 bg-gray-50'>
                {weekDates.map((day, index) => {
                  const dayLabel = index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : day.dayName
                  
                  return (
                    <div key={day.date} className='flex-1 min-w-[80px] p-3 border-r border-gray-200 last:border-r-0'>
                      <div className='text-center'>
                        <p className='text-xs font-semibold text-gray-900 capitalize'>{dayLabel}</p>
                        <p className='text-xs text-gray-500 mt-0.5'>{day.dayNumber} {day.month}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Time slots rows */}
              <div className={`${showAllHours ? 'max-h-[400px] overflow-y-auto' : ''}`}>
                {timeSlots.slice(0, showAllHours ? undefined : 8).map((time) => (
                  <div key={time} className='flex border-b border-gray-100 last:border-b-0'>
                    {weekDates.map((day) => {
                      const appointment = getAppointmentForSlot(day.date, time)
                      
                      return (
                        <button
                          key={`${day.date}-${time}`}
                          onClick={() => appointment && setSelectedAppointment(appointment.id)}
                          className={`flex-1 min-w-[80px] p-2 border-r border-gray-100 last:border-r-0 transition-all text-xs relative ${
                            appointment
                              ? `${getStatusColor(appointment.status)} hover:opacity-90 cursor-pointer`
                              : 'bg-white text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {appointment ? (
                            <div className='text-left'>
                              <div className='flex items-center gap-1'>
                                <div className='font-semibold'>{time}</div>
                                {appointment.status === 'Pendiente' && (
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div className='text-[10px] mt-0.5 truncate'>{appointment.clientName}</div>
                            </div>
                          ) : (
                            <span>{time}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show more button */}
          {!showAllHours && timeSlots.length > 8 && (
            <div className='p-3 border-t border-gray-100 text-center'>
              <button
                onClick={() => setShowAllHours(true)}
                className='text-[#e79c26] hover:text-[#ffc87c] text-sm font-medium inline-flex items-center gap-1'
              >
                <span>Más horas</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Appointment Details Modal */}
      {selectedApt && (
        <div 
          className='fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 p-4'
          onClick={() => setSelectedAppointment(null)}
        >
          <div 
            className='bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl'>
              <div className='flex items-start justify-between'>
                <h2 className='font-semibold text-gray-900 text-lg'>
                  Detalles de la Cita
                </h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className='text-gray-400 hover:text-gray-600 p-1'
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-4 space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 text-lg'>{selectedApt.clientName}</h3>
                  <p className='text-sm text-gray-600'>{selectedApt.service}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApt.status)}`}>
                  {selectedApt.status}
                </span>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 space-y-3 text-sm'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Fecha:
                  </div>
                  <span className='font-medium text-gray-900'>
                    {new Date(selectedApt.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hora:
                  </div>
                  <span className='font-medium text-gray-900'>{selectedApt.time}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ubicación:
                  </div>
                  <span className='font-medium text-gray-900'>{selectedApt.location}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Teléfono:
                  </div>
                  <span className='font-medium text-gray-900'>{selectedApt.phone}</span>
                </div>
              </div>

              <div className='bg-[#ffedd5] rounded-lg p-4 flex justify-between items-center'>
                <div className='flex items-center gap-2 text-gray-700 font-medium'>
                  <svg className="w-5 h-5 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Precio del servicio:
                </div>
                <span className='font-bold text-[#e79c26] text-xl'>${selectedApt.price.toLocaleString('es-MX')}</span>
              </div>

              <div className='space-y-2'>
                {selectedApt.status === 'Pendiente' && (
                  <button className='w-full bg-[#e79c26] text-white py-3 rounded-lg font-medium hover:bg-[#ffc87c] transition-colors flex items-center justify-center gap-2'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmar Cita
                  </button>
                )}
                <button className='w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar Cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProviderBottomNav />
    </div>
  )
}