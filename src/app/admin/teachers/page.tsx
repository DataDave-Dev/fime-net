'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch,
  FaFilter,
  FaChalkboardTeacher,
  FaEnvelope,
  FaGraduationCap,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

interface Teacher {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar_url?: string
  degree?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchTeachers()
  }, [])

  useEffect(() => {
    filterTeachers()
  }, [teachers, searchTerm, statusFilter])

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setTeachers(data || [])
    } catch (error: any) {
      console.error('Error fetching teachers:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filterTeachers = () => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.degree?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por estatus
    if (statusFilter !== 'all') {
      filtered = filtered.filter(teacher =>
        statusFilter === 'active' ? teacher.is_active : !teacher.is_active
      )
    }

    setFilteredTeachers(filtered)
  }

  const handleDeleteTeacher = async (teacherId: string, teacherName: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${teacherName}?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', teacherId)

      if (error) throw error

      setTeachers(teachers.filter(teacher => teacher.id !== teacherId))
    } catch (error: any) {
      console.error('Error deleting teacher:', error)
      alert('Error al eliminar el maestro: ' + error.message)
    }
  }

  const toggleTeacherStatus = async (teacherId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('teachers')
        .update({ is_active: !currentStatus })
        .eq('id', teacherId)

      if (error) throw error

      setTeachers(teachers.map(teacher =>
        teacher.id === teacherId
          ? { ...teacher, is_active: !currentStatus }
          : teacher
      ))
    } catch (error: any) {
      console.error('Error updating teacher status:', error)
      alert('Error al actualizar el estatus: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#53ad35]/20 border-t-[#53ad35] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando maestros...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <FaChalkboardTeacher className="text-[#53ad35]" />
            <span>Gestión de Maestros</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Administra la información de los maestros registrados en el sistema
          </p>
        </div>
        <Link
          href="/admin/teachers/create"
          className="mt-4 sm:mt-0 bg-[#53ad35] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#34a32a] transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <FaPlus />
          <span>Agregar Maestro</span>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Maestros</p>
              <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <FaChalkboardTeacher className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maestros Activos</p>
              <p className="text-3xl font-bold text-green-600">
                {teachers.filter(t => t.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maestros Inactivos</p>
              <p className="text-3xl font-bold text-red-600">
                {teachers.filter(t => !t.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <FaChalkboardTeacher className="text-white text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar maestros..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">Todos los maestros</option>
              <option value="active">Solo activos</option>
              <option value="inactive">Solo inactivos</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
        >
          Error al cargar los maestros: {error}
        </motion.div>
      )}

      {/* Teachers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maestro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FaChalkboardTeacher className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'No se encontraron maestros con los filtros aplicados'
                        : 'No hay maestros registrados'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'all' && (
                      <Link
                        href="/admin/teachers/create"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#53ad35] hover:bg-[#34a32a]"
                      >
                        <FaPlus className="mr-2" />
                        Agregar primer maestro
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {teacher.avatar_url ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={teacher.avatar_url}
                              alt=""
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-[#53ad35] flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {teacher.first_name.charAt(0)}{teacher.last_name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.first_name} {teacher.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{teacher.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {teacher.degree || 'No especificado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleTeacherStatus(teacher.id, teacher.is_active)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          teacher.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {teacher.is_active ? (
                          <>
                            <FaToggleOn className="mr-1" />
                            Activo
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="mr-1" />
                            Inactivo
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(teacher.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/teachers/${teacher.id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id, `${teacher.first_name} ${teacher.last_name}`)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Results Summary */}
      {filteredTeachers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-500"
        >
          Mostrando {filteredTeachers.length} de {teachers.length} maestros
        </motion.div>
      )}
    </div>
  )
}