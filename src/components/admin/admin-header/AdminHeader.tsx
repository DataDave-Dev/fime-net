'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaHome
} from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

interface AdminHeaderProps {
  user: any
  profile: any
}

export default function AdminHeader({ user, profile }: AdminHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona maestros, materias y usuarios de FIME-NET
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}