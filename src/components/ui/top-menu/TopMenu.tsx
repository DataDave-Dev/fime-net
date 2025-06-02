'use client';

import { WebFont } from '@/config/fonts';
import Link from 'next/link';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { IoCalendar, IoHome, IoMapSharp, IoPeople, IoList, IoHeart } from 'react-icons/io5';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function TopMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const { user, isLoading, signOut, getDisplayName } = useAuth()
    const router = useRouter()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    const handleLogout = async () => {
        const result = await signOut()

        if (result.success) {
            setIsUserMenuOpen(false)
            router.push('/')
            router.refresh()
        } else {
            console.error('Error en logout:', result.error)
        }
    }

    return (
        <>
            {/* Header Superior */}
            <div className="bg-[#28313d] text-white py-2 px-4">
                <div className="md:px-12 mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>Bienvenido a FIME-NET</span>
                        <span className="hidden md:inline">La Comunidad Oficial de Alumnos de FIME</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* User Section en header superior */}
                        {isLoading ? (
                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                        ) : user ? (
                            <div className="relative">
                                <motion.button
                                    onClick={toggleUserMenu}
                                    className="flex items-center hover:cursor-pointer space-x-2 px-3 py-1 rounded-lg font-medium transition-all duration-300 text-white hover:bg-white/10"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="w-6 h-6 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            {getDisplayName(user).charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden sm:block text-sm">
                                        {getDisplayName(user)}
                                    </span>
                                </motion.button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {getDisplayName(user)}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/profile"
                                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FaUser className="text-gray-500" />
                                                <span>Mi Perfil</span>
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex hover:cursor-pointer items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <FaSignOutAlt />
                                                <span>Cerrar Sesión</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/auth/login"
                                    className="text-white/90 hover:text-white justify-center transition-colors text-sm flex items-center space-x-1"
                                >
                                    <span>Iniciar Sesión</span>
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="bg-[#53ad35] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#34a32a] transition-colors"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}

                        <div className="hidden md:flex items-center space-x-3">
                            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                                Términos y Condiciones
                            </Link>
                            <Link href="/faq" className="text-white/70 hover:text-white transition-colors">
                                FAQ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Principal */}
            <div className="bg-white shadow-sm">
                <div className="md:px-12 px-2 mx-auto py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-xl flex items-center justify-center shadow-lg">
                                <span className={`${WebFont.className} text-white font-bold text-xl`}>F</span>
                            </div>
                            <div>
                                <h1 className={`${WebFont.className} text-2xl font-bold text-[#28313d]`}>
                                    FIME-NET
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Desarrollado por estudiantes de FIME para estudiantes de FIME.
                                </p>
                            </div>
                        </Link>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <motion.button
                                onClick={toggleMenu}
                                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-[#53ad35] shadow-lg">
                <div className="md:px-12 px-2 mx-auto">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <IoHome />
                            <span>Inicio</span>
                        </Link>

                        <Link
                            href="/about"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <IoList />
                            <span>Acerca de la Web</span>
                        </Link>

                        <Link
                            href="/community"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <IoPeople />
                            <span>Comunidad</span>
                        </Link>

                        <Link
                            href="/map"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <IoMapSharp />
                            <span>Mapa</span>
                        </Link>

                        <Link
                            href="/calendarios"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <IoCalendar />
                            <span>Calendarios</span>
                        </Link>

                        <Link
                            href="/maestros"
                            className="flex items-center space-x-2 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b-2 border-transparent hover:border-white"
                        >
                            <FaUser />
                            <span>Lista de Maestros</span>
                        </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden bg-[#53ad35] border-t border-white/20"
                            >
                                <div className="py-2">
                                    {/* Mobile User Section */}
                                    {user ? (
                                        <div className="border-b border-white/20 pb-4 mb-4 mx-4">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold">
                                                        {getDisplayName(user).charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">
                                                        {getDisplayName(user)}
                                                    </p>
                                                    <p className="text-sm text-white/70">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <FaUser />
                                                    <span>Mi Perfil</span>
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        handleLogout()
                                                        setIsMenuOpen(false)
                                                    }}
                                                    className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                                >
                                                    <FaSignOutAlt />
                                                    <span>Cerrar Sesión</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-b border-white/20 pb-4 mb-4 mx-4 space-y-2">
                                            <Link
                                                href="/auth/login"
                                                className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center space-x-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <FaSignInAlt />
                                                <span>Iniciar Sesión</span>
                                            </Link>

                                            <Link
                                                href="/auth/signup"
                                                className="block px-4 py-3 bg-white/20 text-white rounded-xl font-medium text-center transition-all duration-300"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Registrarse
                                            </Link>
                                        </div>
                                    )}

                                    {/* Mobile Navigation Links */}
                                    <Link
                                        href="/"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IoHome />
                                        <span>Inicio</span>
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IoList />
                                        <span>Acerca de la Web</span>
                                    </Link>

                                    <Link
                                        href="/community"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IoPeople />
                                        <span>Comunidad</span>
                                    </Link>

                                    <Link
                                        href="/map"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IoMapSharp />
                                        <span>Mapa</span>
                                    </Link>

                                    <Link
                                        href="/calendarios"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IoCalendar />
                                        <span>Calendarios</span>
                                    </Link>

                                    <Link
                                        href="/maestros"
                                        className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaUser />
                                        <span>Lista de Maestros</span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </>
    )
}