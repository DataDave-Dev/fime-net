'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaLock, FaHome, FaSignInAlt } from 'react-icons/fa'
import SectionContainer from '@/components/ui/section-container/SectionContainer'

export default function UnauthorizedPage() {
  return (
    <SectionContainer className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaLock className="text-6xl text-red-500 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Acceso No Autorizado
        </h1>
        
        <p className="text-gray-600 mb-8">
          No tienes permisos para acceder a esta página. 
          Solo los administradores pueden acceder al panel de administración.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-[#53ad35] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#34a32a] transition-colors duration-300"
          >
            <FaHome className="mr-2" />
            Volver al Inicio
          </Link>
          
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
          >
            <FaSignInAlt className="mr-2" />
            Iniciar Sesión
          </Link>
        </div>
      </motion.div>
    </SectionContainer>
  )
}