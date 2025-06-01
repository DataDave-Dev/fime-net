'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { login } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import SignInWithGoogleButton from "../google-button/SignInWithGoogleButton"
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaRocket,
  FaSpinner,
  FaUniversity,
  FaEye,
  FaEyeSlash
} from "react-icons/fa"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const formData = new FormData(e.currentTarget)
      const result = await login(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        router.push('/')
        router.refresh()
        window.location.href = '/'
      }
    } catch (err) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
            Bienvenido a FIME-NET
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Ingresa a tu cuenta para continuar
          </p>
        </motion.div>

        {/* Content */}
        <motion.div className="px-8 py-8" variants={itemVariants}>
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#28313d] mb-2 flex items-center space-x-2"
                >
                  <FaEnvelope className="text-[#53ad35]" />
                  <span>Correo Electrónico</span>
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="estudiante@ejemplo.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#28313d] flex items-center space-x-2"
                  >
                    <FaLock className="text-[#53ad35]" />
                    <span>Contraseña</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#53ad35] hover:text-[#34a32a] transition-colors duration-300 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <motion.input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#53ad35] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FaSpinner className="text-white" />
                      </motion.div>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-white" />
                      <span>Iniciar Sesión</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="relative flex items-center justify-center"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500">
                  o continúa con
                </div>
              </motion.div>

              {/* Google Sign In */}
              <motion.div variants={itemVariants}>
                <SignInWithGoogleButton />
              </motion.div>

            </div>
          </form>

          {/* Sign Up Link */}
          <motion.div
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/signup"
                className="text-[#53ad35] hover:text-[#34a32a] font-semibold transition-colors duration-300 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </motion.div>

          {/* University Note */}
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-[#53ad35]/10 to-[#34a32a]/10 rounded-xl border border-[#53ad35]/20"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 text-sm text-[#28313d]">
              <FaUniversity className="text-[#53ad35] flex-shrink-0" />
              <span className="font-medium">
                Plataforma exclusiva para estudiantes y profesores de FIME UANL
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Additional Help */}
      <motion.div
        className="mt-6 text-center"
        variants={itemVariants}
      >
        <p className="text-sm text-gray-500">
          ¿Necesitas ayuda?{" "}
          <Link
            href="/support"
            className="text-[#53ad35] hover:text-[#34a32a] transition-colors duration-300 hover:underline"
          >
            Contacta soporte
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}