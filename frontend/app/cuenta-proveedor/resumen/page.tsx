'use client'

import { useAuth } from '@/hooks/useAuth'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import ProviderDesktopNav from '@/components/ProviderDesktopNav'
import FinancialSummary from '@/components/FinancialSummary'
import Link from 'next/link'

export default function TransactionsPage() {
  const { isLoading } = useAuth('provider')

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <svg className="w-12 h-12 mx-auto mb-4 text-[#e79c26] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className='text-gray-700'>Cargando...</p>
        </div>
      </div>
    )
  }

  // Mock data for demo
  const currentMonth = new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString('es-MX', { month: 'long' })

  const financialSummary = {
    currentMonth: {
      total: 45800,
      completed: 12,
      pending: 3,
      growth: 15.3
    },
    lastMonth: {
      total: 39700,
      completed: 10
    }
  }

  const recentTransactions = [
    {
      id: 'tx-001',
      date: '2025-11-05',
      client: 'María González',
      service: 'Corte de cabello',
      amount: 450,
      status: 'Completado',
      paymentMethod: 'Interledger'
    },
    {
      id: 'tx-002',
      date: '2025-11-04',
      client: 'Carlos Ramírez',
      service: 'Reparación de laptop',
      amount: 1200,
      status: 'Completado',
      paymentMethod: 'Interledger'
    },
    {
      id: 'tx-003',
      date: '2025-11-03',
      client: 'Ana Martínez',
      service: 'Limpieza profunda',
      amount: 800,
      status: 'Pendiente',
      paymentMethod: 'Interledger'
    },
    {
      id: 'tx-004',
      date: '2025-11-02',
      client: 'Luis Hernández',
      service: 'Masaje terapéutico',
      amount: 650,
      status: 'Completado',
      paymentMethod: 'Interledger'
    },
    {
      id: 'tx-005',
      date: '2025-11-01',
      client: 'Patricia López',
      service: 'Consulta nutricional',
      amount: 500,
      status: 'Completado',
      paymentMethod: 'Interledger'
    }
  ]

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
          <h1 className='text-3xl md:text-4xl font-bold'>Resumen</h1>
        </div>
      </header>

      <main className='p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6'>
        {/* Financial Summary Cards */}
        <FinancialSummary />

        {/* Monthly Comparison */}
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-4 text-lg'>
            Comparación Mensual
          </h2>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-700 capitalize'>{currentMonth}</span>
              <span className='font-semibold text-[#e79c26]'>
                ${financialSummary.currentMonth.total.toLocaleString('es-MX')}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-700 capitalize'>{lastMonth}</span>
              <span className='font-semibold text-gray-700'>
                ${financialSummary.lastMonth.total.toLocaleString('es-MX')}
              </span>
            </div>
            <div className='pt-2 border-t border-gray-200'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>Diferencia</span>
                <span className='font-semibold text-[#e79c26]'>
                  +${(financialSummary.currentMonth.total - financialSummary.lastMonth.total).toLocaleString('es-MX')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
          <div className='p-6 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-900 text-lg'>
              Transacciones Recientes
            </h2>
          </div>
          <div className='divide-y divide-gray-100'>
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className='p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900'>{transaction.client}</p>
                    <p className='text-sm text-gray-700'>{transaction.service}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-gray-900'>
                      ${transaction.amount.toLocaleString('es-MX')}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'Completado'
                        ? 'bg-[#ffedd5] text-[#e79c26]'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-3 text-xs text-gray-700'>
                  <div className='flex items-center gap-1'>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(transaction.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </div>
                  <span>•</span>
                  <div className='flex items-center gap-1'>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {transaction.paymentMethod}
                  </div>
                  <span>•</span>
                  <span className='font-mono'>{transaction.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ProviderBottomNav />
    </div>
  )
}