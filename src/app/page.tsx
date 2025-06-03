'use client';

import SectionContainer from "@/components/ui/section-container/SectionContainer";
import { motion } from 'framer-motion';
import Link from "next/link";
import {
  FaRocket,
  FaBookOpen,
  FaBook,
  FaComments,
  FaCalendarAlt,
  FaLaptopCode,
  FaTrophy,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      {/* Hero Section con Animaciones */}
      <SectionContainer className="bg-gradient-to-br from-green-50 via-emerald-50 to-slate-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        />
        {/* Círculos decorativos - Ajustados para móvil */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-72 h-32 sm:h-72 bg-[#53ad35]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-96 h-40 sm:h-96 bg-[#34a32a]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="text-center py-8 sm:py-10 relative z-10 px-4">
          <motion.div
            className="inline-flex items-center bg-[#53ad35]/10 text-[#006633] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-[#53ad35]/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <GiPartyPopper className="size-3 sm:size-4" />
            </motion.span>
            <span className="ml-2">Nueva plataforma - ¡Únete ahora!</span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#313b48] mb-4 sm:mb-8 leading-tight px-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bienvenido a{" "}
            <motion.span
              className="bg-gradient-to-r from-[#53ad35] via-[#34a32a] to-[#006633] bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              FIME-NET
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#28313d] mb-6 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            La plataforma más completa para la comunidad estudiantil de la{" "}
            <span className="font-semibold text-[#34a32a]">Facultad de Ingeniería Mecánica y Eléctrica</span>.{" "}
            Conecta, aprende y crece junto a tus compañeros.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(83, 173, 53, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaRocket className="size-3 sm:size-4" />
                </motion.div>
                <span>Explorar Comunidad</span>
              </span>
            </motion.button>
            <motion.button
              className="group border-2 border-[#53ad35] text-[#53ad35] px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#53ad35] hover:text-white transition-all duration-300 hover:shadow-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#53ad35",
                color: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center space-x-2">
                <FaBookOpen className="size-3 sm:size-4" />
                <span>Ver Recursos</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Servicios - Responsive */}
      <SectionContainer className="bg-gradient-to-b from-gray-50 to-white">
        <div className="py-12 sm:py-20 px-4">
          <motion.div
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] bg-clip-text text-transparent">
                Servicios Principales
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#28313d] max-w-3xl mx-auto px-4">
              Herramientas diseñadas específicamente para impulsar tu éxito académico
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: FaBookOpen,
                title: "Biblioteca Digital",
                description: "Accede a una colección completa de libros, papers y recursos académicos. Todo organizado por materia y carrera.",
                color: "from-[#53ad35] to-[#34a32a]",
                bgColor: "bg-[#53ad35]/10",
                textColor: "text-[#34a32a]",
                hoverColor: "hover:bg-[#53ad35]",
                borderColor: "border-[#53ad35]/20"
              },
              {
                icon: FaComments,
                title: "Foros de Estudiantes",
                description: "Conecta con compañeros, resuelve dudas, comparte conocimiento y forma grupos de estudio.",
                color: "from-[#34a32a] to-[#006633]",
                bgColor: "bg-[#34a32a]/10",
                textColor: "text-[#006633]",
                hoverColor: "hover:bg-[#34a32a]",
                borderColor: "border-[#34a32a]/20"
              },
              {
                icon: FaCalendarAlt,
                title: "Calendario Académico",
                description: "Mantente al día con fechas importantes, exámenes, entregas y eventos académicos.",
                color: "from-[#006633] to-[#313b48]",
                bgColor: "bg-[#006633]/10",
                textColor: "text-[#313b48]",
                hoverColor: "hover:bg-[#006633]",
                borderColor: "border-[#006633]/20"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <motion.div
                  className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transform transition-all duration-300`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="text-xl sm:text-2xl md:text-3xl text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-[#313b48]">{service.title}</h3>
                <p className="text-[#28313d] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <motion.button
                  className={`group/btn ${service.bgColor} ${service.textColor} px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold ${service.hoverColor} hover:text-white transition-all duration-300 flex items-center space-x-2 border ${service.borderColor} text-sm sm:text-base`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>
                    {index === 0 ? "Explorar" : index === 1 ? "Conectar" : "Ver Fechas"}
                  </span>
                  <motion.span
                    className="group-hover/btn:translate-x-1 transform transition-transform"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* Recursos - Responsive */}
      <SectionContainer className="bg-gradient-to-br from-[#53ad35] via-[#34a32a] to-[#006633] text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-5 sm:top-10 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              x: [0, -30, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="py-12 sm:py-20 text-center relative z-10 px-4">
          <motion.h2
            className="text-xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recursos para tu Éxito
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-2xl mb-8 sm:mb-16 opacity-90 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Todo lo que necesitas para destacar en tu carrera universitaria
          </motion.p>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: FaBook, title: "Guías de Estudio", desc: "Materiales creados por estudiantes destacados" },
              { icon: FaLaptopCode, title: "Software Especializado", desc: "Herramientas y licencias para ingeniería" },
              { icon: FaTrophy, title: "Concursos y Premios", desc: "Participa en competencias académicas" },
              { icon: FaHandshake, title: "Mentorías", desc: "Conecta con estudiantes avanzados" }
            ].map((resource, index) => (
              <motion.div
                key={index}
                className="bg-white/15 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 transform hover:scale-105"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.25)"
                }}
              >
                <motion.div
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <resource.icon className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 mx-auto" />
                </motion.div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{resource.title}</h3>
                <p className="text-xs sm:text-sm opacity-80">{resource.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* CTA Final Animado - Responsive */}
      <SectionContainer className="bg-gradient-to-r from-[#313b48] via-[#28313d] to-[#313b48] text-white">
        <div className="py-12 sm:py-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              ¿Listo para el{" "}
              <motion.span
                className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                siguiente nivel?
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-2xl mb-8 sm:mb-12 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Únete a miles de estudiantes que ya están transformando su experiencia universitaria con FIME-NET
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(83, 173, 53, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link className="flex items-center justify-center space-x-2 sm:space-x-3" href="/auth/signup">
                  <motion.div
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaRocket className="text-base sm:text-xl mr-2" />
                  </motion.div>
                  Crear Cuenta Gratis</Link>
              </motion.button>
              <motion.button
                className="group border-2 border-[#53ad35] text-[#53ad35] px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#53ad35] hover:text-white transition-all duration-300 hover:shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#53ad35",
                  color: "#ffffff"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about" className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <FaLightbulb className="text-base sm:text-xl" />
                  </motion.div>
                  <span>Saber Más</span>
                </Link>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}