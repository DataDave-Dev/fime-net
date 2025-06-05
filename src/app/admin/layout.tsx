'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { FaSpinner, FaUserShield } from 'react-icons/fa'
import AdminSidebar from '@/components/admin/admin-sidebar/AdminSidebar'
import SectionContainer from '@/components/ui/section-container/SectionContainer'
import AdminHeader from '@/components/admin/admin-header/AdminHeader'

interface Profile {
  id: string
  role: string
  full_name?: string
  email?: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUserAndRole()
  }, [])

  const checkUserAndRole = async () => {
    try {
      console.log('🔍 Verificando usuario y rol en cliente...')
      
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('❌ Error obteniendo usuario:', userError)
        router.push('/auth/login')
        return
      }

      if (!user) {
        console.log('🚫 No hay usuario autenticado')
        router.push('/auth/login')
        return
      }

      console.log('👤 Usuario encontrado:', user.email)
      setUser(user)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role, full_name, email')
        .eq('id', user.id)
        .single()

      console.log('👥 Perfil obtenido:', profile)
      console.log('❌ Error de perfil:', profileError)

      if (profileError) {
        console.error('❌ Error obteniendo perfil:', profileError)
        
        if (profileError.code === 'PGRST116') {
          console.log('📝 Creando perfil...')
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email,
              role: 'user'
            }])
            .select()
            .single()

          if (createError) {
            console.error('❌ Error creando perfil:', createError)
            setError('Error al crear el perfil de usuario')
            return
          }

          setProfile(newProfile)
          
          if (newProfile.role !== 'admin') {
            router.push('/unauthorized')
            return
          }
        } else {
          setError('Error al verificar permisos de usuario')
          return
        }
      } else {
        setProfile(profile)
        
        if (!profile || profile.role !== 'admin') {
          console.log('🚫 Usuario no es admin:', profile?.role)
          router.push('/unauthorized')
          return
        }
      }

      console.log('✅ Usuario autorizado como admin')
      setLoading(false)

    } catch (error: any) {
      console.error('💥 Error en verificación:', error)
      setError('Error de conexión. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center space-y-6">
            <div className="relative">
              <FaSpinner className="text-5xl text-blue-600 mx-auto animate-spin" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaUserShield className="text-blue-600 text-sm" />
              </motion.div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verificando Acceso
              </h2>
              <p className="text-gray-600">
                Validando permisos de administrador...
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ Verificando autenticación</p>
              <p>✓ Validando permisos</p>
              <p>⏳ Cargando panel de administración...</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FaUserShield className="text-red-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Error de Acceso</h2>
            <p className="text-gray-600">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  checkUserAndRole()
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1">
          <AdminHeader />
          {children}
      </main>
    </div>
  )
}