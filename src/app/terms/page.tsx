'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionContainer from '@/components/ui/section-container/SectionContainer'
import { 
  FaGraduationCap, 
  FaShieldAlt, 
  FaUsers, 
  FaExclamationTriangle,
  FaEnvelope,
  FaCalendarAlt,
  FaGavel,
  FaUserCheck
} from 'react-icons/fa'
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'

export default function TermsPage() {

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
        className="max-w-5xl mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-2xl flex items-center justify-center">
              <FaGavel className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Al usar FIME-NET, aceptas estos términos y condiciones. Te recomendamos leerlos cuidadosamente.
          </p>
          <div className="bg-green-50 border border-blue-200 rounded-xl p-4 mt-6 inline-block">
            <p className="text-sm text-green-800">
              <FaCalendarAlt className="inline mr-2" />
              Última actualización: 2 de Junio del 2025
            </p>
          </div>
        </motion.div>

        {/* Contenido */}
        <div className="space-y-12">

          {/* 1. Información General */}
          <motion.section variants={itemVariants}>
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaGraduationCap className="text-[#53ad35] mr-3" />
                1. Información General
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div><strong>Plataforma:</strong> FIME-NET</div>
                  <div><strong>Naturaleza:</strong> Plataforma estudiantil independiente</div>
                  <div><strong>Ámbito:</strong> Facultad de Ingeniería Mecánica y Eléctrica (FIME-UANL)</div>
                  <div><strong>Contacto:</strong> contacto-fime-net@gmail.com</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <FaExclamationTriangle className="inline mr-2" />
                    <strong>Importante:</strong> FIME-NET es una iniciativa estudiantil independiente, 
                    no es una plataforma oficial de FIME o UANL.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Aceptación de Términos */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUserCheck className="text-[#53ad35] mr-3" />
                2. Aceptación de Términos
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>El uso voluntario de la plataforma implica la aceptación de estos términos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Debes ser mayor de 18 años o contar con consentimiento parental</span>
                </li>
                <li className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Nos reservamos el derecho de modificar estos términos con notificación previa</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* 3. Elegibilidad y Registro */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUsers className="text-[#53ad35] mr-3" />
                3. Elegibilidad y Registro
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usuarios Autorizados:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-green-500" />
                      <span>Estudiantes activos de FIME-UANL</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-green-500" />
                      <span>Ex-alumnos de FIME</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-green-500" />
                      <span>Personal académico y administrativo de FIME</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-green-500" />
                      <span>Visitantes con acceso limitado</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requisitos de Registro:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-blue-500" />
                      <span>Email válido y confiable</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-blue-500" />
                      <span>Información veraz y actualizada</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-blue-500" />
                      <span>Una cuenta por persona</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <IoCheckmarkCircle className="text-blue-500" />
                      <span>Verificación por correo electrónico</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 4. Uso Aceptable */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FaShieldAlt className="text-[#53ad35] mr-3" />
                4. Uso Aceptable
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Usos Permitidos */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <IoCheckmarkCircle className="text-green-600 mr-2" />
                    Usos Permitidos
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Acceso a recursos académicos</li>
                    <li>• Participación en foros estudiantiles</li>
                    <li>• Intercambio de información académica</li>
                    <li>• Creación de grupos de estudio</li>
                    <li>• Compartir experiencias educativas</li>
                    <li>• Consulta de información de profesores</li>
                    <li>• Navegación por el mapa de FIME</li>
                  </ul>
                </div>

                {/* Usos Prohibidos */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <IoCloseCircle className="text-red-600 mr-2" />
                    Usos Prohibidos
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Plagio o violación de derechos de autor</li>
                    <li>• Acoso, bullying o discriminación</li>
                    <li>• Spam o publicidad no autorizada</li>
                    <li>• Compartir información personal de terceros</li>
                    <li>• Actividades ilegales o fraudulentas</li>
                    <li>• Contenido ofensivo, sexual o violento</li>
                    <li>• Creación de cuentas falsas</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 5. Contenido y Propiedad Intelectual */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                5. Contenido y Propiedad Intelectual
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contenido del Usuario</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Mantienes derechos sobre tu contenido original</li>
                    <li>• Otorgas licencia no exclusiva a FIME-NET para usar, mostrar y distribuir</li>
                    <li>• Eres responsable de la originalidad y legalidad de tu contenido</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contenido de la Plataforma</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Propiedad de FIME-NET o licenciado legalmente</li>
                    <li>• Uso personal y académico únicamente</li>
                    <li>• Prohibida redistribución comercial</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Materiales Académicos</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Respeto a derechos de autor de profesores y autores</li>
                    <li>• Uso bajo principios de "fair use" educativo</li>
                    <li>• Atribución adecuada requerida</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 6. Limitaciones de Responsabilidad */}
          <motion.section variants={itemVariants}>
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaExclamationTriangle className="text-yellow-600 mr-3" />
                6. Limitaciones de Responsabilidad
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 font-semibold">FIME-NET NO es responsable por:</p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Contenido generado por usuarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interrupciones del servicio</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pérdida de datos (respaldos recomendados)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Decisiones académicas basadas en información de la plataforma</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Conflictos entre usuarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Exactitud de información de terceros</span>
                  </li>
                </ul>
                
                <div className="bg-white rounded-xl p-4 mt-6">
                  <p className="text-sm text-gray-600">
                    <strong>Uso bajo propio riesgo:</strong> La información puede ser inexacta, 
                    los servicios están en desarrollo continuo y la disponibilidad no está garantizada 24/7.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 7. Modificaciones y Terminación */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                7. Modificaciones y Terminación
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Modificaciones del Servicio</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <IoCheckmarkCircle className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>Derecho a agregar/quitar funciones</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <IoCheckmarkCircle className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>Notificación previa de cambios importantes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <IoCheckmarkCircle className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>Migración de datos cuando sea posible</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Terminación de Cuenta</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-1">Por el Usuario:</h4>
                      <p className="text-sm text-gray-600">Eliminación voluntaria en cualquier momento</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-1">Por FIME-NET:</h4>
                      <p className="text-sm text-gray-600">Violación de términos, inactividad prolongada o razones legales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 8. Contacto */}
          <motion.section variants={itemVariants}>
            <div className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaEnvelope className="mr-3" />
                8. Contacto y Soporte
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Para consultas sobre términos:</h3>
                  <p className="mb-2">📧 contacto-fime-net@gmail.com</p>
                  <p className="text-sm opacity-90">Tiempo de respuesta: 3-5 días hábiles</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Reportes de violaciones:</h3>
                  <p className="mb-2">📧 reportes-fime-net@gmail.com</p>
                  <p className="text-sm opacity-90">Revisión prioritaria en 24-48 horas</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer de Términos */}
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200"
            variants={itemVariants}
          >
            <p className="text-gray-600 mb-4">
              Al continuar usando FIME-NET, confirmas que has leído, entendido y aceptado 
              estos términos y condiciones en su totalidad.
            </p>
            <div className="text-sm text-gray-500">
              <p>© 2025 FIME-NET. Desarrollado con ❤️ por estudiantes de FIME.</p>
              <p className="mt-2">
                ¿Tienes preguntas? Contáctanos en 
                <a href="mailto:contacto-fime-net@gmail.com" className="text-[#53ad35] hover:underline ml-1">
                  contacto-fime-net@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}