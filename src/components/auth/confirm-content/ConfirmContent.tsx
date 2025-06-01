'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'
import Link from 'next/link'

export default function ConfirmContent() {
  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const confirmUser = async () => {
      try {
        const token_hash = searchParams.get('token_hash')
        const type = searchParams.get('type')

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          })

          if (error) {
            console.error('Error confirming user:', error)
            setError(error.message)
          } else {
            setConfirmed(true)
            // Redirigir después de 3 segundos
            setTimeout(() => {
              router.push('/')
            }, 3000)
          }
        } else {
          setError('Token de confirmación no válido')
        }
      } catch (err: any) {
        console.error('Error in confirmation:', err)
        setError('Error procesando la confirmación')
      } finally {
        setLoading(false)
      }
    }

    confirmUser()
  }, [searchParams, supabase.auth, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className={`px-8 py-8 text-center ${
            confirmed 
              ? 'bg-gradient-to-r from-green-600 to-green-700' 
              : error 
                ? 'bg-gradient-to-r from-red-600 to-red-700'
                : 'bg-gradient-to-r from-[#53ad35] to-[#34a32a]'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaGraduationCap className="text-3xl text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              FIME-NET
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Confirmación de cuenta
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8 text-center">
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <FaSpinner className="text-4xl text-[#53ad35]" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Confirmando tu cuenta...
                </h2>
                <p className="text-gray-600 text-sm">
                  Por favor espera mientras procesamos tu confirmación.
                </p>
              </>
            ) : confirmed ? (
              <>
                <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Cuenta confirmada exitosamente!
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Tu cuenta ha sido verificada. Serás redirigido automáticamente en unos segundos.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Ir al inicio</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-6xl text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Error en la confirmación
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  {error || 'Hubo un problema confirmando tu cuenta. El enlace puede haber expirado.'}
                </p>
                <div className="space-y-3">
                  <Link
                    href="/auth/signup"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Registrarse de nuevo</span>
                  </Link>
                  
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    <span>Volver al inicio</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}