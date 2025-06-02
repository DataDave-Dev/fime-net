'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '@/components/ui/section-container/SectionContainer'
import { 
  FaQuestionCircle,
  FaChevronDown,
  FaSearch,
  FaUsers, FaEnvelope,
  FaBook,
  FaCalendarAlt
} from 'react-icons/fa'
import { 
  IoSchoolOutline, 
  IoHelpCircleOutline,
  IoLockClosedOutline,
  IoCodeSlashOutline,
  IoPersonOutline
} from 'react-icons/io5'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const categories = [
    { id: 'all', label: 'Todas', icon: <FaQuestionCircle />, color: 'bg-gray-100 text-gray-700' },
    { id: 'general', label: 'General', icon: <IoSchoolOutline />, color: 'bg-blue-100 text-blue-700' },
    { id: 'account', label: 'Cuenta', icon: <IoPersonOutline />, color: 'bg-green-100 text-green-700' },
    { id: 'features', label: 'Funciones', icon: <FaBook />, color: 'bg-purple-100 text-purple-700' },
    { id: 'technical', label: 'Técnico', icon: <IoCodeSlashOutline />, color: 'bg-orange-100 text-orange-700' },
    { id: 'privacy', label: 'Privacidad', icon: <IoLockClosedOutline />, color: 'bg-red-100 text-red-700' },
  ]

  const faqs = [
    // General
    {
      id: 1,
      category: 'general',
      question: '¿Qué es FIME-NET?',
      answer: 'FIME-NET es una plataforma estudiantil independiente desarrollada por y para estudiantes de la Facultad de Ingeniería Mecánica y Eléctrica (FIME) de la UANL. Nuestro objetivo es centralizar recursos académicos, facilitar la comunicación entre estudiantes y crear una comunidad vibrante.',
      tags: ['plataforma', 'estudiantes', 'FIME']
    },
    {
      id: 2,
      category: 'general',
      question: '¿Es FIME-NET oficial de la universidad?',
      answer: 'No, FIME-NET es una iniciativa estudiantil independiente. Aunque no somos una plataforma oficial de FIME o UANL, buscamos colaborar y complementar los servicios institucionales existentes.',
      tags: ['oficial', 'universidad', 'independiente']
    },
    {
      id: 3,
      category: 'general',
      question: '¿Quién puede usar FIME-NET?',
      answer: 'Principalmente estudiantes activos de FIME, ex-alumnos, personal académico y administrativo. Los visitantes tienen acceso limitado a contenido público. Priorizamos el acceso a miembros de la comunidad FIME.',
      tags: ['usuarios', 'acceso', 'estudiantes']
    },
    {
      id: 4,
      category: 'general',
      question: '¿Cuánto cuesta usar FIME-NET?',
      answer: 'FIME-NET es completamente gratuito para todos los usuarios. Es un proyecto desarrollado por estudiantes sin fines de lucro, financiado únicamente por el tiempo y esfuerzo de sus desarrolladores.',
      tags: ['gratis', 'costo', 'gratuito']
    },

    // Cuenta
    {
      id: 5,
      category: 'account',
      question: '¿Cómo me registro en FIME-NET?',
      answer: 'Puedes registrarte usando tu email institucional (@uanl.edu.mx preferible) o tu cuenta de Google. El proceso incluye verificación por correo electrónico para garantizar la seguridad de tu cuenta.',
      tags: ['registro', 'cuenta', 'email']
    },
    {
      id: 6,
      category: 'account',
      question: '¿Necesito email institucional para registrarme?',
      answer: 'Aunque preferimos emails institucionales (@uanl.edu.mx) para verificar tu afiliación con FIME, también aceptamos otros emails.',
      tags: ['email', 'institucional', 'verificación']
    },
    {
      id: 7,
      category: 'account',
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a tu perfil, selecciona "Configuración de cuenta" y luego "Cambiar contraseña". También puedes usar la opción "Olvidé mi contraseña" en la página de inicio de sesión para recibir un enlace de restablecimiento.',
      tags: ['contraseña', 'cambiar', 'restablecer']
    },
    {
      id: 8,
      category: 'account',
      question: '¿Cómo elimino mi cuenta?',
      answer: 'En la configuración de tu perfil, encontrarás la opción "Eliminar cuenta". Este proceso es irreversible después de 30 días.',
      tags: ['eliminar', 'cuenta', 'borrar']
    },

    // Funciones
    {
      id: 9,
      category: 'features',
      question: '¿Qué funciones tiene la plataforma?',
      answer: 'FIME-NET incluye: mapa interactivo de FIME, lista de profesores, calendario académico, foros estudiantiles, recursos de estudio, grupos colaborativos y un sistema de notificaciones académicas.',
      tags: ['funciones', 'características', 'servicios']
    },
    {
      id: 10,
      category: 'features',
      question: '¿Cómo uso el mapa de FIME?',
      answer: 'El mapa interactivo te permite explorar las instalaciones de FIME, encontrar salones, laboratorios, oficinas y servicios. Incluye navegación paso a paso y información actualizada sobre cada ubicación.',
      tags: ['mapa', 'navegación', 'ubicaciones']
    },
    {
      id: 11,
      category: 'features',
      question: '¿Cómo busco información de profesores?',
      answer: 'En la sección "Lista de Maestros" puedes buscar por nombre, materia o departamento. Cada perfil incluye información de contacto, valoración por alumnos y materias que imparte.',
      tags: ['profesores', 'maestros', 'búsqueda']
    },
    {
      id: 12,
      category: 'features',
      question: '¿Puedo crear grupos de estudio?',
      answer: 'Sí, en la sección "Comunidad" puedes crear y unirte a grupos de estudio por materia. Los grupos incluyen chat, compartir archivos y organizar sesiones de estudio.',
      tags: ['grupos', 'estudio', 'colaboración']
    },

    // Técnico
    {
      id: 13,
      category: 'technical',
      question: '¿En qué tecnologías está desarrollado FIME-NET?',
      answer: 'Utilizamos Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion para el frontend, y Supabase como backend con PostgreSQL. Está desplegado en Vercel.',
      tags: ['tecnología', 'desarrollo', 'stack']
    },
    {
      id: 14,
      category: 'technical',
      question: '¿Cómo reporto un bug o error?',
      answer: 'Puedes reportar bugs a través del formulario de contacto, por email a reportes-fime-net@gmail.com, o crear un issue en nuestro repositorio de GitHub si eres desarrollador.',
      tags: ['bug', 'error', 'reporte']
    },
    {
      id: 15,
      category: 'technical',
      question: '¿Puedo contribuir al desarrollo?',
      answer: '¡Absolutamente! Somos un proyecto open source. Puedes contribuir con código, reportar bugs, sugerir mejoras o ayudar con documentación. Visita nuestro GitHub para más información.',
      tags: ['contribuir', 'desarrollo', 'open source']
    },
    {
      id: 16,
      category: 'technical',
      question: '¿Por qué la página carga lento?',
      answer: 'Estamos en desarrollo continuo optimizando el rendimiento. Si experimentas lentitud, verifica tu conexión, actualiza tu navegador o reporta el problema específico para que podamos investigarlo.',
      tags: ['rendimiento', 'velocidad', 'optimización']
    },

    // Privacidad
    {
      id: 17,
      category: 'privacy',
      question: '¿Cómo protegen mis datos personales?',
      answer: 'Utilizamos cifrado SSL/TLS, almacenamiento seguro en Supabase, y cumplimos con estándares de privacidad. No vendemos datos a terceros y solo recopilamos información necesaria para el funcionamiento.',
      tags: ['privacidad', 'datos', 'seguridad']
    },
    {
      id: 18,
      category: 'privacy',
      question: '¿Qué información recopilan sobre mí?',
      answer: 'Recopilamos: información de perfil (nombre, email), actividad en la plataforma, preferencias de uso y datos analíticos anónimos para mejorar el servicio. Puedes ver y controlar estos datos en tu perfil.',
      tags: ['información', 'recopilación', 'datos']
    },
    {
      id: 19,
      category: 'privacy',
      question: '¿Comparten mi información con terceros?',
      answer: 'No vendemos ni compartimos información personal con terceros comerciales. Solo compartimos datos anónimos y agregados para análisis académicos o mejoras del servicio, sin identificarte personalmente.',
      tags: ['terceros', 'compartir', 'información']
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <SectionContainer>
      <motion.div
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-2xl flex items-center justify-center">
              <IoHelpCircleOutline className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre FIME-NET. 
            Si no encuentras lo que buscas, no dudes en contactarnos.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#53ad35] text-white shadow-lg'
                    : category.color + ' hover:scale-105'
                }`}
                whileHover={{ scale: activeCategory === category.id ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div className="space-y-4 mb-16" variants={itemVariants}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <FaChevronDown className="text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="px-6 py-5">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-2xl p-8 text-white text-center"
          variants={itemVariants}
        >
          <FaEnvelope className="text-4xl mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-4">
            ¿No encontraste tu respuesta?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Nuestro equipo está aquí para ayudarte con cualquier pregunta adicional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:contacto-fime-net@gmail.com"
              className="bg-white text-[#53ad35] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              <span>Enviar Email</span>
            </motion.a>
            <motion.a
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#53ad35] transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaQuestionCircle />
              <span>Formulario de Contacto</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          variants={itemVariants}
        >
          {[
            { number: '20+', label: 'Preguntas Frecuentes', icon: <FaQuestionCircle /> },
            { number: '5', label: 'Categorías', icon: <FaBook /> },
            { number: '24h', label: 'Tiempo de Respuesta', icon: <FaCalendarAlt /> },
            { number: '1,200+', label: 'Usuarios Ayudados', icon: <FaUsers /> },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#53ad35] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}