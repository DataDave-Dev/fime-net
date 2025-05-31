'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { BsFillExclamationSquareFill, BsInstagram } from 'react-icons/bs';
import { FaTwitter, FaBars, FaTimes } from "react-icons/fa";
import { FaClipboardList } from 'react-icons/fa6';
import { IoCalendar, IoHome, IoMapSharp, IoPeople } from 'react-icons/io5';

export default function TopMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            {/* Header Superior con Gradiente */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 text-sm">
                        <div className="flex items-center text-sm space-x-3">
                            <span className="text-gray-300 font-medium">Bienvenido a FIME-NET</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <span className="text-gray-300">La Comunidad Oficial de Alumnos de FIME</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex space-x-3">
                                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                                    <FaTwitter className='size-4' />
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-pink-400 transition-all duration-300 transform hover:scale-110">
                                    <BsInstagram className='size-4' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Principal con Glassmorphism */}
            <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50'
                : 'bg-white shadow-lg'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Corporativo */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 via-green-700 to-green-900 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                                        <span className="text-white font-bold text-2xl">F</span>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent tracking-tight">
                                        FIME-NET
                                    </h1>
                                    <p className="text-sm text-gray-600 hidden sm:block font-medium">
                                        Desarrollado por alumnos, para alumnos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Links Usuario */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <Link href="#terminos" className="text-gray-700 hover:text-green-600 font-semibold text-sm tracking-wide transition-all duration-300 relative group px-3 py-2">
                                Términos y Condiciones
                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                            <Link href="#faq" className="text-gray-700 hover:text-green-600 font-semibold text-sm tracking-wide transition-all duration-300 relative group px-3 py-2">
                                FAQ
                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                        </div>

                        {/* Boton Menu Mobile */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMenu}
                                className={`p-3 rounded-xl transition-all duration-300 transform ${isMenuOpen
                                    ? 'bg-green-100 text-green-600 rotate-180'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navegación Principal*/}
                <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 border-t border-green-600/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hidden lg:flex">
                            {[
                                { href: "/", label: "Inicio", icon: <IoHome className='size-4' /> },
                                { href: "#acerca", label: "Acerca de la Web", icon: <BsFillExclamationSquareFill className='size-4' /> },
                                { href: "#comunidad", label: "Comunidad", icon: <IoPeople className='size-4' /> },
                                { href: "#mapa", label: "Mapa", icon: <IoMapSharp className='size-4' /> },
                                { href: "#calendario", label: "Calendarios", icon: <IoCalendar className='size-4' /> },
                                { href: "#maestros", label: "Lista de Maestros", icon: <FaClipboardList className='size-4' /> }
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="group flex items-center space-x-2 px-6 py-4 text-white hover:bg-green-600/50 transition-all duration-300 font-medium border-r border-green-600/30 last:border-r-0 relative overflow-hidden"
                                >
                                    <span className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                                        {item.icon}
                                    </span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {item.label}
                                    </span>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                <div className={`lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
                        <div className="px-4 pt-4 pb-6 space-y-2">

                            {/* Enlaces principales */}
                            <div className="space-y-1">
                                {[
                                    { href: "/", label: "Inicio", icon: <IoHome className='size-4' /> },
                                    { href: "#acerca", label: "Acerca de la Web", icon: <BsFillExclamationSquareFill className='size-4' /> },
                                    { href: "#comunidad", label: "Comunidad", icon: <IoPeople className='size-4' /> },
                                    { href: "#mapa", label: "Mapa", icon: <IoMapSharp className='size-4' /> },
                                    { href: "#calendario", label: "Calendarios", icon: <IoCalendar className='size-4' /> },
                                    { href: "#maestros", label: "Lista de Maestros", icon: <FaClipboardList className='size-4' /> }
                                ].map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center space-x-3 px-4 py-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2"
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                                <Link href="#terminos" className="block px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300">
                                    📋 Términos y Condiciones
                                </Link>
                                <Link href="#faq" className="block px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300">
                                    FAQ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
