'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaChalkboardTeacher,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaSave,
  FaArrowLeft,
  FaTimes
} from 'react-icons/fa'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { TeacherFormData } from '@/types/interface'

export default function CreateTeacherPage() {
  const [formData, setFormData] = useState<TeacherFormData>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    degree: '',
    is_active: true
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<TeacherFormData>>({})

  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClient()

  const validateForm = (): boolean => {
    const newErrors: Partial<TeacherFormData> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es obligatorio'
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es obligatorio'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'El grado académico es obligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name as keyof TeacherFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { data: existingTeacher } = await supabase
        .from('teachers')
        .select('email')
        .eq('email', formData.email.toLowerCase())
        .single()

      if (existingTeacher) {
        setErrors({ email: 'Ya existe un maestro con este email' })
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('teachers')
        .insert([
          {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.toLowerCase().trim(),
            degree: formData.degree.trim(),
            is_active: true,
            created_by: user?.id
          }
        ])
        .select()

      if (error) throw error

      router.push('/admin/teachers?success=created')
      
    } catch (error: any) {
      console.error('Error creating teacher:', error)
      alert('Error al crear el maestro: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/teachers"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <FaChalkboardTeacher className="text-[#53ad35]" />
              <span>Agregar Nuevo Maestro</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2 ml-11">
            Complete la información del maestro para agregarlo al sistema
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-gray-400" />
                Nombre *
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent transition-colors ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Juan Carlos"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-gray-400" />
                Apellido *
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent transition-colors ${
                  errors.last_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: García López"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-gray-400" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: nombre@dominio.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Grado Académico */}
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                <FaGraduationCap className="inline mr-2 text-gray-400" />
                Grado Académico *
              </label>
              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent transition-colors ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar grado...</option>
                <option value="lic.">Licenciado/a</option>
                <option value="Ing.">Ingeniero/a</option>
                <option value="M.C">Maestro/a</option>
                <option value="Dr.">Doctor/a</option>
              </select>
              {errors.degree && (
                <p className="mt-1 text-sm text-red-600">{errors.degree}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              href="/admin/teachers"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FaTimes />
              <span>Cancelar</span>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-[#53ad35] text-white rounded-xl font-medium hover:bg-[#34a32a] transition-colors flex items-center space-x-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaSave />
              <span>{loading ? 'Guardando...' : 'Guardar Maestro'}</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Help Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Consejos para registrar maestros</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Asegúrate de que el email sea único y válido</li>
          <li>• El grado académico ayuda a los estudiantes a identificar al maestro</li>
          <li>• La imagen del avatar debe ser una URL válida (opcional)</li>
          <li>• Todos los campos marcados con * son obligatorios</li>
        </ul>
      </motion.div>
    </div>
  )
}