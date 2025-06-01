'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionContainer from '@/components/ui/section-container/SectionContainer'
import Link from 'next/link'
import { IoMdClock } from 'react-icons/io'
import { IoHome, IoMail, IoWarning } from 'react-icons/io5'
import { GrUpdate } from 'react-icons/gr'

export default function ErrorPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <SectionContainer className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50'>
            <motion.div
                className='text-center max-w-2xl mx-auto px-4'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className='mb-8'
                    variants={floatingVariants}
                    animate="animate"
                >
                    <div className='relative inline-block'>
                        <motion.div 
                            className='w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl'
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className='text-5xl md:text-6xl text-white'><IoWarning /></span>
                        </motion.div>
                        <motion.div 
                            className='absolute -top-4 -right-4 w-8 h-8 bg-red-300/50 rounded-full'
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        ></motion.div>
                        <motion.div 
                            className='absolute -bottom-4 -left-4 w-6 h-6 bg-orange-300/50 rounded-full'
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.4, 0.7, 0.4]
                            }}
                            transition={{ 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        ></motion.div>
                    </div>
                </motion.div>

                <motion.h1 
                    className='text-4xl md:text-6xl font-bold text-gray-900 mb-4'
                    variants={itemVariants}
                >
                    ¡Oops!
                </motion.h1>

                <motion.h2 
                    className='text-xl md:text-2xl font-semibold text-gray-700 mb-6'
                    variants={itemVariants}
                >
                    Algo ha salido mal
                </motion.h2>

                <motion.div 
                    className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 mb-8'
                    variants={itemVariants}
                >
                    <p className='text-gray-600 text-base md:text-lg leading-relaxed mb-4'>
                        Lo sentimos, pero parece que ha ocurrido un error inesperado. 
                        Nuestro equipo ha sido notificado automáticamente.
                    </p>
                    <div className='bg-gray-100 rounded-lg p-4 text-left'>
                        <h3 className='font-semibold text-gray-800 text-sm mb-2'>Posibles soluciones:</h3>
                        <ul className='text-sm text-gray-600 space-y-1'>
                            <li>• Actualiza la página (F5)</li>
                            <li>• Verifica tu conexión a internet</li>
                            <li>• Intenta nuevamente en unos minutos</li>
                            <li>• Limpia la caché del navegador</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div 
                    className='flex flex-col sm:flex-row gap-4 justify-center'
                    variants={itemVariants}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Link 
                            href="/"
                            className='inline-flex items-center bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            <span className='mr-2'><IoHome /></span>
                            Volver al Inicio
                        </Link>
                    </motion.div>

                    <motion.button
                        onClick={() => window.location.reload()}
                        className='inline-flex items-center border-2 border-[#53ad35] text-[#53ad35] px-8 py-4 rounded-xl font-semibold hover:bg-[#53ad35] hover:text-white transition-all duration-300'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <motion.span 
                            className='mr-2'
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <GrUpdate />
                        </motion.span>
                        Reintentar
                    </motion.button>
                </motion.div>

                <motion.div 
                    className='mt-12 text-center'
                    variants={itemVariants}
                >
                    <p className='text-gray-500 text-sm mb-4'>
                        ¿El problema persiste? Contáctanos
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center text-sm'>
                        <motion.a 
                            href="mailto:support-fime-net@gmail.com"
                            className='inline-flex items-center text-[#53ad35] hover:text-[#34a32a] transition-colors'
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className='mr-2'><IoMail /></span>
                            support-fime-net@gmail.com
                        </motion.a>
                        <motion.div 
                            className='inline-flex items-center text-gray-500'
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className='mr-2'><IoMdClock /></span>
                            Soporte 24/7
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                className='absolute top-20 left-20 w-32 h-32 bg-red-200/20 rounded-full blur-3xl'
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className='absolute bottom-20 right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl'
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -30, 0],
                    y: [0, -50, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </SectionContainer>
    )
}
