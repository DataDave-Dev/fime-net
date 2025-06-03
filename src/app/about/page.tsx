'use client'

import SectionContainer from '@/components/ui/section-container/SectionContainer'
import DynamicStats from '@/components/ui/stats/DynamicStats'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import {
    FaGraduationCap,
    FaRocket,
    FaChartBar,
    FaLaptopCode,
    FaLightbulb,
    FaServer,
    FaCode,
    FaCloud,
    FaBug,
    FaSearch,
    FaComments,
    FaVial,
    FaRoute
} from 'react-icons/fa'
import {
    IoSettingsOutline,
    IoAtOutline,
    IoFlaskOutline,
    IoPeopleOutline,
    IoShieldCheckmarkOutline
} from 'react-icons/io5'

export default function AboutPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <SectionContainer>
            {/* Hero Section Mejorado */}
            <motion.div
                className='relative min-h-screen flex items-center justify-center'
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Background con gradiente animado */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#53ad35]/5 via-white to-[#34a32a]/5'></div>

                {/* Elementos decorativos animados */}
                <motion.div
                    className='absolute top-20 left-10 w-20 h-20 bg-[#53ad35]/10 rounded-full'
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className='relative z-10 text-center px-4 max-w-6xl mx-auto'>
                    <motion.div
                        className='inline-flex items-center px-6 py-3 bg-white shadow-lg rounded-full text-[#53ad35] text-sm font-medium mb-8 border border-[#53ad35]/20'
                        variants={itemVariants}
                    >
                        <span className='w-2 h-2 bg-[#53ad35] rounded-full mr-3 animate-pulse'></span>
                        <FaGraduationCap className='mr-2' />
                        Desarrollado en FIME UANL
                    </motion.div>

                    <motion.h1
                        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight'
                        variants={itemVariants}
                    >
                        La Plataforma del
                        <span className='block text-transparent bg-gradient-to-r from-[#53ad35] to-[#34a32a] bg-clip-text'>
                            Futuro Estudiantil
                        </span>
                    </motion.h1>

                    <motion.p
                        className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12'
                        variants={itemVariants}
                    >
                        Conectamos a más de <strong>1,200 estudiantes</strong> de FIME mediante
                        tecnología de vanguardia, centralizando recursos académicos y fomentando
                        la colaboración estudiantil.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        className='flex flex-col sm:flex-row gap-4 justify-center mb-16'
                        variants={itemVariants}
                    >
                        <motion.button
                            className='bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2'
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaRocket />
                            <span>Explorar Plataforma</span>
                        </motion.button>
                        <motion.button
                            className='border-2 border-[#53ad35] text-[#53ad35] px-8 py-4 rounded-xl font-semibold hover:bg-[#53ad35] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2'
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaChartBar />
                            <span>Ver Estadísticas</span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            <div className='mt-24 space-y-32'>

                {/* Sección de Valores Corporativos */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div className='text-center mb-16' variants={itemVariants}>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                            Nuestros Principios
                        </h2>
                        <div className='w-24 h-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] mx-auto mb-6'></div>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Los valores que guían nuestro desarrollo y compromiso con la excelencia académica
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {[
                            {
                                icon: <IoAtOutline className='text-2xl' />,
                                title: 'Excelencia',
                                description: 'Comprometidos con la calidad y precisión en cada funcionalidad desarrollada.'
                            },
                            {
                                icon: <IoFlaskOutline className='text-2xl' />,
                                title: 'Innovación',
                                description: 'Aplicamos las últimas tecnologías para crear soluciones vanguardistas.'
                            },
                            {
                                icon: <IoPeopleOutline className='text-2xl' />,
                                title: 'Colaboración',
                                description: 'Fomentamos el trabajo en equipo y la participación de toda la comunidad.'
                            },
                            {
                                icon: <IoShieldCheckmarkOutline className='text-2xl' />,
                                title: 'Confiabilidad',
                                description: 'Garantizamos seguridad y disponibilidad constante de nuestros servicios.'
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className='group text-center'
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full'>
                                    <motion.div
                                        className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#53ad35]/10 to-[#34a32a]/20 rounded-xl flex items-center justify-center text-[#53ad35]'
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        {value.icon}
                                    </motion.div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-4'>{value.title}</h3>
                                    <p className='text-gray-600 leading-relaxed'>{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Misión y Visión */}
                <motion.section
                    role="region"
                    aria-labelledby="mission-heading"
                    className='bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 md:p-12'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div className='text-center mb-12' variants={itemVariants}>
                        <h2 id="mission-heading" className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                            Misión y Visión
                        </h2>
                        <div className='w-24 h-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] mx-auto mb-6'></div>
                    </motion.div>

                    <div className='grid lg:grid-cols-2 gap-8 lg:gap-16'>
                        {/* Misión */}
                        <motion.div className='relative' variants={itemVariants}>
                            <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#53ad35] to-[#34a32a] rounded-full'></div>
                            <div className='pl-8'>
                                <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center'>
                                    <span className='w-3 h-3 bg-[#53ad35] rounded-full mr-3'></span>
                                    Misión
                                </h3>
                                <p className='text-base md:text-lg text-gray-700 leading-relaxed'>
                                    Desarrollar y mantener una plataforma tecnológica integral que optimice
                                    los procesos académicos, facilite el acceso a recursos educativos y
                                    promueva la innovación en la comunidad estudiantil de FIME.
                                </p>
                            </div>
                        </motion.div>

                        {/* Visión */}
                        <motion.div className='relative' variants={itemVariants}>
                            <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#34a32a] to-[#006633] rounded-full'></div>
                            <div className='pl-8'>
                                <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center'>
                                    <span className='w-3 h-3 bg-[#34a32a] rounded-full mr-3'></span>
                                    Visión
                                </h3>
                                <p className='text-base md:text-lg text-gray-700 leading-relaxed'>
                                    Ser reconocidos como la plataforma líder en soluciones tecnológicas
                                    educativas, estableciendo un estándar de excelencia que inspire a
                                    otras instituciones académicas a nivel nacional.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Elemento decorativo central */}
                    <motion.div
                        className='flex justify-center mt-12'
                        variants={itemVariants}
                    >
                        <div className='relative'>
                            <motion.div
                                className='w-20 h-20 bg-gradient-to-br from-[#53ad35]/10 to-[#34a32a]/20 rounded-full flex items-center justify-center text-[#53ad35]'
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <IoSettingsOutline className='text-2xl' />
                            </motion.div>
                            <div className='absolute -top-2 -right-2 w-6 h-6 bg-[#53ad35]/20 rounded-full'></div>
                            <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-[#34a32a]/20 rounded-full'></div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Estadísticas Corporativas - ACTUALIZADA */}
                <motion.section
                    className='bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-3xl overflow-hidden relative'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <div className='absolute inset-0 bg-black/5'></div>
                    <div className='relative z-10 p-16'>
                        <motion.div className='text-center mb-16' variants={itemVariants}>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                Impacto y Alcance en Tiempo Real
                            </h2>
                            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
                                Métricas actualizadas que demuestran nuestro compromiso con la comunidad estudiantil
                            </p>
                            <div className="mt-4 inline-flex items-center bg-white/10 rounded-full px-4 py-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                                <span className="text-sm text-white/80">Datos actualizados cada 5 minutos</span>
                            </div>
                        </motion.div>

                        {/* Componente de estadísticas dinámicas */}
                        <DynamicStats />
                    </div>

                    {/* Elementos decorativos */}
                    <motion.div
                        className='absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full'
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    <motion.div
                        className='absolute -bottom-20 -left-20 w-32 h-32 bg-white/5 rounded-full'
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                </motion.section>

                {/* Oportunidades de Colaboración Corporativa */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div className='text-center mb-16' variants={itemVariants}>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                            Oportunidades de Colaboración
                        </h2>
                        <div className='w-24 h-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] mx-auto mb-6'></div>
                        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                            Únete a nuestro ecosistema tecnológico y contribuye al desarrollo de
                            soluciones innovadoras para la educación superior
                        </p>
                    </motion.div>

                    <div className='grid lg:grid-cols-2 gap-12 mb-16'>
                        <motion.div
                            className='group relative'
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className='absolute inset-0 bg-gradient-to-br from-[#53ad35]/5 to-[#34a32a]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300'></div>
                            <div className='relative bg-white rounded-2xl p-10 shadow-lg border border-gray-100'>
                                <div className='flex items-center mb-6'>
                                    <div className='w-16 h-16 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-xl flex items-center justify-center text-white text-2xl mr-4'>
                                        <FaLaptopCode />
                                    </div>
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-900'>Desarrollador Técnico</h3>
                                        <p className='text-gray-600'>Contribución al desarrollo</p>
                                    </div>
                                </div>
                                <p className='text-gray-700 mb-6 leading-relaxed'>
                                    Participa en el desarrollo de funcionalidades avanzadas, optimización de rendimiento
                                    y implementación de nuevas tecnologías en nuestra plataforma.
                                </p>
                                <div className='grid grid-cols-2 gap-4 mb-6'>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaCode className='text-[#53ad35]' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Frontend</h4>
                                            <p className='text-xs text-gray-600'>React, Next.js, TypeScript</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaServer className='text-[#53ad35]' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Backend</h4>
                                            <p className='text-xs text-gray-600'>Node.js, APIs, Databases</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaCloud className='text-[#53ad35]' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>DevOps</h4>
                                            <p className='text-xs text-gray-600'>CI/CD, Deployment</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaBug className='text-[#53ad35]' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Testing</h4>
                                            <p className='text-xs text-gray-600'>QA, Unit Tests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className='group relative'
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300'></div>
                            <div className='relative bg-white rounded-2xl p-10 shadow-lg border border-gray-100'>
                                <div className='flex items-center mb-6'>
                                    <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mr-4'>
                                        <FaLightbulb />
                                    </div>
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-900'>Consultor Estratégico</h3>
                                        <p className='text-gray-600'>Ideas y mejoras</p>
                                    </div>
                                </div>
                                <p className='text-gray-700 mb-6 leading-relaxed'>
                                    Aporta perspectiva estratégica, identifica oportunidades de mejora y
                                    contribuye con análisis de usabilidad y experiencia de usuario.
                                </p>
                                <div className='grid grid-cols-2 gap-4 mb-6'>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaSearch className='text-blue-500' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>UX Research</h4>
                                            <p className='text-xs text-gray-600'>Análisis de usabilidad</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaComments className='text-blue-500' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Feedback</h4>
                                            <p className='text-xs text-gray-600'>Reportes detallados</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaVial className='text-blue-500' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Testing</h4>
                                            <p className='text-xs text-gray-600'>Casos de uso</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                                        <FaRoute className='text-blue-500' />
                                        <div>
                                            <h4 className='font-semibold text-gray-900 text-sm mb-1'>Strategy</h4>
                                            <p className='text-xs text-gray-600'>Planificación</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Call to Action Corporativo */}
                    <motion.div
                        className='text-center bg-gray-50 rounded-3xl p-12'
                        variants={itemVariants}
                    >
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                            ¿Listo para Formar Parte del Futuro?
                        </h3>
                        <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
                            Únete a nuestro equipo multidisciplinario y contribuye al desarrollo de
                            la próxima generación de herramientas educativas digitales.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <motion.button
                                className='bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                Solicitar Información
                            </motion.button>
                            <motion.button
                                className='border-2 border-[#53ad35] text-[#53ad35] px-8 py-4 rounded-xl font-semibold hover:bg-[#53ad35] hover:text-white transition-all duration-300'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Link href="https://github.com/DataDave-Dev/fime-net.git">
                                    Ver Documentación
                                </Link>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.section>
            </div>
        </SectionContainer>
    )
}