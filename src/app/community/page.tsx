'use client'

import SectionContainer from '@/components/ui/section-container/SectionContainer'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaTools,
  FaRocket, 
  FaCog,
  FaUsers,
  FaComments,
  FaBook,
  FaCalendarAlt
} from 'react-icons/fa'

export default function CommunityPage() {
  const upcomingFeatures = [
    { icon: <FaComments />, name: 'Foros de Discusión', color: 'text-blue-500' },
    { icon: <FaBook />, name: 'Biblioteca Digital', color: 'text-green-500' },
    { icon: <FaCalendarAlt />, name: 'Eventos Académicos', color: 'text-orange-500' }
  ]

  return (
    <SectionContainer className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Icono Principal Animado */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaTools />
            </motion.div>
            
            {/* Elementos decorativos */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaCog className="text-white text-xs" />
            </motion.div>
          </div>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          🚧 En Construcción 🚧
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Estamos trabajando en algo{" "}
          <span className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] bg-clip-text text-transparent font-bold">
            increíble
          </span>
        </motion.p>

        {/* Descripción */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaRocket className="text-[#53ad35] mr-3" />
            ¡Pronto disponible!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Estamos desarrollando la plataforma de comunidad más completa para estudiantes de FIME. 
            Un espacio donde podrás conectar, aprender y colaborar con tus compañeros.
          </p>

          {/* Próximas Características */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`flex text-3xl justify-center mb-2 ${feature.color}`}>
                  {feature.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {feature.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progreso */}
        <motion.div
          className="bg-gradient-to-r from-[#53ad35]/10 to-[#34a32a]/10 rounded-xl p-6 border border-[#53ad35]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">Progreso de desarrollo</span>
            <span className="text-[#53ad35] font-bold">10%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "10%" }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-gray-600 mb-4">
            ¿Quieres ser notificado cuando esté lista?
          </p>
          <motion.button
            className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🔔 Notificarme cuando esté lista
          </motion.button>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          className="mt-12 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p>
            Mientras tanto, puedes explorar otras secciones de{" "}
            <span className="text-[#53ad35] font-medium">FIME-NET</span>
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  )
}