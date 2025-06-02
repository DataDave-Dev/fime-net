'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { signup } from "@/lib/auth-actions"
import SignInWithGoogleButton from "../google-button/SignInWithGoogleButton"
import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
  FaBullseye,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaPaperPlane
} from "react-icons/fa"
import { MdSecurity } from "react-icons/md"
import { HiSparkles } from "react-icons/hi"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')

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

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const email = formData.get('email') as string
      setUserEmail(email)
      
      await signup(formData)
      
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta. Inténtalo de nuevo.')
      console.log('SignUp error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        className="w-full max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header de éxito */}
          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-8 text-center"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaCheckCircle className="text-3xl text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              ¡Cuenta creada exitosamente!
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Hemos enviado un enlace de confirmación
            </p>
          </motion.div>

          {/* Contenido del mensaje */}
          <motion.div className="px-8 py-8 text-center" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaPaperPlane className="text-3xl text-green-600" />
            </motion.div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Revisa tu correo electrónico
            </h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Hemos enviado un enlace de confirmación a:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-800">
                  {userEmail}
                </p>
              </div>
              <p className="text-sm">
                Haz clic en el enlace del correo para activar tu cuenta y acceder a todas las funciones de FIME-NET.
              </p>
              <p className="text-xs text-gray-500">
                Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Ir al inicio de sesión</span>
              </Link>
              
              <Link
                href="/"
                className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <span>Volver al inicio</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
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
            Únete a FIME-NET
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Crea tu cuenta y forma parte de la comunidad estudiantil
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
          <form action={handleSubmit}>
            <div className="space-y-6">

              {/* Names Row */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold text-[#28313d] mb-2 flex items-center space-x-2"
                  >
                    <FaUser className="text-[#53ad35]" />
                    <span>Nombre</span>
                  </label>
                  <motion.input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="Juan"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold text-[#28313d] mb-2 flex items-center space-x-2"
                  >
                    <FaUser className="text-[#53ad35]" />
                    <span>Apellido</span>
                  </label>
                  <motion.input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Pérez"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </motion.div>

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
                  placeholder="juan.perez@uanl.edu.mx"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Preferiblemente usa tu correo institucional de UANL
                </p>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#28313d] mb-2 flex items-center space-x-2"
                >
                  <FaLock className="text-[#53ad35]" />
                  <span>Contraseña</span>
                </label>
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
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 8 caracteres, incluye números y símbolos
                </p>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-[#28313d] mb-2 flex items-center space-x-2"
                >
                  <MdSecurity className="text-[#53ad35]" />
                  <span>Confirmar Contraseña</span>
                </label>
                <div className="relative">
                  <motion.input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#53ad35] focus:ring-0 focus:outline-none transition-colors duration-300 text-[#28313d] placeholder-gray-400"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#53ad35] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div className="flex items-start space-x-3" variants={itemVariants}>
                <motion.input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 text-[#53ad35] border-2 border-gray-300 rounded focus:ring-[#53ad35] focus:ring-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                  Acepto los{" "}
                  <Link href="/terms" className="text-[#53ad35] hover:text-[#34a32a] underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="text-[#53ad35] hover:text-[#34a32a] underline">
                    política de privacidad
                  </Link>
                </label>
              </motion.div>

              {/* Sign Up Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r hover:cursor-pointer from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
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
                      <span>Creando cuenta...</span>
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-white" />
                      <span>Crear Cuenta</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div
                className="relative flex items-center justify-center"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500">
                  o regístrate con
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SignInWithGoogleButton />
              </motion.div>

            </div>
          </form>

          <motion.div
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/login"
                className="text-[#53ad35] hover:text-[#34a32a] font-semibold transition-colors duration-300 hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-[#53ad35]/10 to-[#34a32a]/10 rounded-xl border border-[#53ad35]/20"
            variants={itemVariants}
          >
            <div className="text-sm text-[#28313d] space-y-2">
              <div className="font-semibold text-center mb-3 flex items-center justify-center space-x-2">
                <FaBullseye className="text-[#53ad35]" />
                <span>Al unirte a FIME-NET obtienes:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <FaBookOpen className="text-[#53ad35] flex-shrink-0" />
                  <span>Acceso a biblioteca digital</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-[#53ad35] flex-shrink-0" />
                  <span>Grupos de estudio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-[#53ad35] flex-shrink-0" />
                  <span>Calendario académico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTrophy className="text-[#53ad35] flex-shrink-0" />
                  <span>Eventos y concursos</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  )
}