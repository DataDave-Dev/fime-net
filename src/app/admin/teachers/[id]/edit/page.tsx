'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaChalkboardTeacher,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaImage,
  FaSave,
  FaArrowLeft,
  FaTimes,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { TeacherFormData } from '@/types/interface'

export default function EditTeacherPage() {
  const [formData, setFormData] = useState<TeacherFormData>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    degree: '',
    is_active: true
  })
  const [originalData, setOriginalData] = useState<TeacherFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Partial<TeacherFormData>>({})
  const [previewImage, setPreviewImage] = useState<string>('')

  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const supabase = createClient()

  const teacherId = params.id as string

  useEffect(() => {
    if (teacherId) {
      fetchTeacher()
    }
  }, [teacherId])

  const fetchTeacher = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', teacherId)
        .single()

      if (error) throw error

      if (!data) {
        router.push('/admin/teachers')
        return
      }

      const teacherData: TeacherFormData = {
        id: data.id,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        degree: data.degree || '',
        is_active: data.is_active
      }

      setFormData(teacherData)
      setOriginalData(teacherData)
      setPreviewImage(data.avatar_url || '')
    } catch (error: any) {
      console.error('Error fetching teacher:', error)
      alert('Error al cargar el maestro: ' + error.message)
      router.push('/admin/teachers')
    } finally {
      setLoading(false)
    }
  }

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

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof TeacherFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Manejar cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData(prev => ({
      ...prev,
      avatar_url: value
    }))
    setPreviewImage(value)
  }

  // Toggle estado activo
  const handleToggleActive = () => {
    setFormData(prev => ({
      ...prev,
      is_active: !prev.is_active
    }))
  }

  // Verificar si hay cambios
  const hasChanges = () => {
    if (!originalData) return false
    
    return (
      formData.first_name !== originalData.first_name ||
      formData.last_name !== originalData.last_name ||
      formData.email !== originalData.email ||
      formData.degree !== originalData.degree ||
      formData.is_active !== originalData.is_active
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!hasChanges()) {
      alert('No se han realizado cambios')
      return
    }

    setSaving(true)

    try {
      if (formData.email !== originalData?.email) {
        const { data: existingTeacher } = await supabase
          .from('teachers')
          .select('email')
          .eq('email', formData.email.toLowerCase())
          .neq('id', teacherId)
          .single()

        if (existingTeacher) {
          setErrors({ email: 'Ya existe otro maestro con este email' })
          setSaving(false)
          return
        }
      }

      const { data, error } = await supabase
        .from('teachers')
        .update({
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.toLowerCase().trim(),
          degree: formData.degree.trim(),
          is_active: formData.is_active,
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', teacherId)
        .select()

      if (error) throw error

      console.log('Teacher updated successfully:', data)
      
      router.push('/admin/teachers')
      
    } catch (error: any) {
      console.error('Error updating teacher:', error)
      alert('Error al actualizar el maestro: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#53ad35]/20 border-t-[#53ad35] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del maestro...</p>
        </div>
      </div>
    )
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
              <span>Editar Maestro</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2 ml-11">
            Modifica la información de {formData.first_name} {formData.last_name}
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Estado:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            formData.is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {formData.is_active ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </motion.div>

      {/* Changes Indicator */}
      {hasChanges() && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <p className="text-yellow-800 text-sm">
            ⚠️ Tienes cambios sin guardar. No olvides hacer clic en "Guardar Cambios" para conservarlos.
          </p>
        </motion.div>
      )}

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
                placeholder="Ej: juan.garcia@fime.uanl.mx"
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
                <option value="Licenciado">Licenciado/a</option>
                <option value="Ingeniero">Ingeniero/a</option>
                <option value="Maestro">Maestro/a</option>
                <option value="Doctor">Doctor/a</option>
                <option value="PhD">PhD</option>
                <option value="Profesor">Profesor/a</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.degree && (
                <p className="mt-1 text-sm text-red-600">{errors.degree}</p>
              )}
            </div>
          </div>

          {/* Estado Activo */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Estado del Maestro</h3>
                <p className="text-sm text-gray-600">
                  Los maestros inactivos no aparecerán en las búsquedas públicas
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleActive}
                className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#53ad35] focus:ring-offset-2 ${
                  formData.is_active ? 'bg-[#53ad35]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                    formData.is_active ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
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
              disabled={saving || !hasChanges()}
              className={`px-6 py-3 bg-[#53ad35] text-white rounded-xl font-medium hover:bg-[#34a32a] transition-colors flex items-center space-x-2 ${
                (saving || !hasChanges()) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaSave />
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Información sobre la edición</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Los cambios se guardarán automáticamente cuando hagas clic en "Guardar Cambios"</li>
          <li>• Si cambias el estado a "Inactivo", el maestro no aparecerá en búsquedas públicas</li>
          <li>• El email debe ser único en todo el sistema</li>
          <li>• Todos los campos marcados con * son obligatorios</li>
        </ul>
      </motion.div>
    </div>
  )
}