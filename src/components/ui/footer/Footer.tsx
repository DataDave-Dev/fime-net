'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaCode,
  FaShieldAlt,
  FaQuestionCircle,
  FaUsers,
  FaBookOpen,
  FaBug,
  FaLightbulb,
  FaGraduationCap
} from 'react-icons/fa'
import { IoArrowUp, IoSchoolOutline } from 'react-icons/io5'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    plataforma: [
      { label: 'Inicio', href: '/' },
      { label: 'Acerca de', href: '/about' },
      { label: 'Materias', href: '/subjects' },
      { label: 'Mapa FIME', href: '/map' },
      { label: 'Lista de Profesores', href: '/teachers' },
    ],
    recursos: [
      { label: 'Documentación', href: '/docs' },
      { label: 'Guías de Estudio', href: '/guides' },
      { label: 'Calendario Académico', href: '/calendar' },
      { label: 'Biblioteca Digital', href: '/library' },
      { label: 'Herramientas', href: '/tools' },
    ],
    comunidad: [
      { label: 'Foros', href: '/forums' },
      { label: 'Eventos', href: '/events' },
      { label: 'Grupos de Estudio', href: '/study-groups' },
      { label: 'Contribuir', href: '/contribute' },
      { label: 'GitHub', href: 'https://github.com/DataDave-Dev/fime-net' },
    ],
    soporte: [
      { label: 'Centro de Ayuda', href: '/help' },
      { label: 'Reportar Bug', href: '/report-bug' },
      { label: 'Solicitar Feature', href: '/request-feature' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Estado del Sistema', href: '/status' },
    ],
    legal: [
      { label: 'Términos & Condiciones', href: '/terms' },
      { label: 'Política de Privacidad', href: '/privacy' },
      { label: 'Política de Cookies', href: '/cookies' },
      { label: 'Código de Conducta', href: '/code-of-conduct' },
      { label: 'Licencias', href: '/licenses' },
    ]
  }

  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://instagram.com/fime.net', label: 'Instagram' },
    { icon: <FaFacebook />, href: 'https://facebook.com/fime.net', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com/fime_net', label: 'Twitter' },
    { icon: <FaGithub />, href: 'https://github.com/DataDave-Dev/fime-net', label: 'GitHub' },
  ]

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
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Contenido */}
      <motion.div
        className="md:px-12 mx-auto py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Parte Superior */}
        <div className="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-2 mb-12">

          {/* Sección de presentación */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-xl flex items-center justify-center">
                <span className='text-2xl font-bold text-white'>F</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">FIME-NET</h3>
                <p className="text-gray-400 text-sm">Plataforma Estudiantil</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              La plataforma que revoluciona la experiencia estudiantil en FIME,
              conectando más de 1,200 estudiantes con recursos académicos y una
              comunidad vibrante.
            </p>

            {/* Contacto */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-[#53ad35] flex-shrink-0" />
                <span className="text-sm">FIME UANL, Av. Universidad s/n, San Nicolás, N.L.</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-[#53ad35] flex-shrink-0" />
                <span className="text-sm">contacto-fime-net@gmail.com</span>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#53ad35] rounded-lg flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <motion.div key={section} variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-white capitalize flex items-center">
                {section === 'plataforma' && <IoSchoolOutline className="mr-2 text-[#53ad35]" />}
                {section === 'recursos' && <FaBookOpen className="mr-2 text-[#53ad35]" />}
                {section === 'comunidad' && <FaUsers className="mr-2 text-[#53ad35]" />}
                {section === 'soporte' && <FaQuestionCircle className="mr-2 text-[#53ad35]" />}
                {section === 'legal' && <FaShieldAlt className="mr-2 text-[#53ad35]" />}
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#53ad35] transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Parte Inferior */}
        <motion.div
          className="pt-8 border-t border-gray-700"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} FIME-NET. Hecho con</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>por estudiantes de FIME.</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <FaCode className="text-[#53ad35]" />
                <span>Desarrollado con Next.js & Supabase</span>
              </div>

              {/* Versión de la página */}
              <div className="bg-[#53ad35]/20 text-[#53ad35] px-3 py-1 rounded-full text-xs font-medium">
                v2.0.0
              </div>
            </div>
          </div>

          {/* Información adicional del proyecto */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 text-xs">
                <FaLightbulb className="text-yellow-500" />
                <span>Proyecto Open Source</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
                <FaBug className="text-red-500" />
                <span>Reporta bugs en GitHub</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2 text-gray-400 text-xs">
                <FaShieldAlt className="text-green-500" />
                <span>Datos protegidos con SSL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Botón para volver arriba rápidamente */}
      <motion.button
        className="fixed group bottom-8 hover:cursor-pointer right-8 w-12 h-12 bg-[#53ad35] hover:bg-[#34a32a] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Volver arriba"
      >
        <IoArrowUp className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300" />
      </motion.button>
    </footer>
  )
}