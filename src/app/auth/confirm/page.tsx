'use client'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import {
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaRocket,
  FaEnvelope
} from "react-icons/fa"
import Link from "next/link"

export default function ConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  useEffect(() => {
    const confirmUser = async () => {
      try {
        const token_hash = searchParams.get('token_hash')
        const type = searchParams.get('type')

        if (!token_hash || type !== 'signup') {
          setError('Token de confirmación inválido o expirado')
          setStatus('error')
          return
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'signup'
        })

        if (error) {
          setError(error.message)
          setStatus('error')
        } else {
          setStatus('success')
          setTimeout(() => {
            router.push('/')
          }, 3000)
        }
      } catch (err) {
        console.error('Error confirmando usuario:', err)
        setError('Error inesperado al confirmar la cuenta')
        setStatus('error')
      }
    }

    confirmUser()
  }, [searchParams, router, supabase.auth])

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <FaSpinner className="text-6xl text-[#53ad35]" />,
          title: "Confirmando tu cuenta...",
          message: "Estamos verificando tu correo electrónico",
          bgColor: "from-blue-50 to-blue-100",
          borderColor: "border-blue-200"
        }
      case 'success':
        return {
          icon: <FaCheckCircle className="text-6xl text-green-600" />,
          title: "¡Cuenta confirmada exitosamente!",
          message: "Tu cuenta ha sido verificada. Serás redirigido al inicio en unos segundos.",
          bgColor: "from-green-50 to-green-100",
          borderColor: "border-green-200"
        }
      case 'error':
        return {
          icon: <FaExclamationTriangle className="text-6xl text-red-600" />,
          title: "Error en la confirmación",
          message: error || "No se pudo confirmar tu cuenta",
          bgColor: "from-red-50 to-red-100",
          borderColor: "border-red-200"
        }
    }
  }

  const statusContent = getStatusContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] px-8 py-8 text-center"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaGraduationCap className="text-3xl text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              FIME-NET
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Confirmación de cuenta
            </p>
          </motion.div>

          {/* Content */}
          <motion.div className="px-8 py-8" variants={itemVariants}>
            
            {/* Status Card */}
            <motion.div 
              className={`p-6 bg-gradient-to-r ${statusContent.bgColor} rounded-xl border ${statusContent.borderColor} text-center`}
              variants={itemVariants}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={status === 'loading' ? { rotate: 360 } : {}}
                transition={status === 'loading' ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
              >
                {statusContent.icon}
              </motion.div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {statusContent.title}
              </h2>
              
              <p className="text-gray-600 text-sm">
                {statusContent.message}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div className="mt-6 space-y-4" variants={itemVariants}>
              {status === 'success' && (
                <motion.div
                  className="text-center space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FaRocket className="text-white" />
                    <span>Ir al Inicio</span>
                  </Link>
                  
                  <div className="text-sm text-gray-600">
                    <p>Ahora puedes iniciar sesión con tu cuenta</p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/auth/signup"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FaEnvelope />
                    <span>Registrarse de nuevo</span>
                  </Link>
                  
                  <Link
                    href="/auth/login"
                    className="w-full flex items-center justify-center space-x-2 border-2 border-[#53ad35] text-[#53ad35] py-3 px-6 rounded-xl font-semibold hover:bg-[#53ad35] hover:text-white transition-all duration-300"
                  >
                    <span>Ir al Login</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Help Section */}
            <motion.div 
              className="mt-8 p-4 bg-gradient-to-r from-[#53ad35]/10 to-[#34a32a]/10 rounded-xl border border-[#53ad35]/20"
              variants={itemVariants}
            >
              <div className="text-center text-sm text-[#28313d]">
                <p className="font-medium mb-2">
                  🎓 ¿Necesitas ayuda?
                </p>
                <p className="text-xs text-gray-600">
                  Si tienes problemas confirmando tu cuenta, contacta a{" "}
                  <Link 
                    href="/support" 
                    className="text-[#53ad35] hover:text-[#34a32a] underline font-medium"
                  >
                    soporte técnico
                  </Link>
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div 
          className="mt-6 text-center"
          variants={itemVariants}
        >
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-[#53ad35] transition-colors duration-300 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}