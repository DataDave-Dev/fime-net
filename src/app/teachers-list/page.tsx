'use client'

import SectionContainer from '@/components/ui/section-container/SectionContainer'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from '@/hooks'
import { createClient } from '@/utils/supabase/client'
import { Career, Subject, Teachers } from '@/types/interface'
import {
  FaUser,
  FaEnvelope,
  FaStar,
  FaSort,
  FaChevronDown,
  FaUserTie,
  FaBook,
  FaEye,
  FaComment,
  FaCertificate,
  FaUsers
} from 'react-icons/fa'
import {
  IoMailOutline,
  IoFilterOutline,
  IoGridOutline,
  IoListOutline,
  IoSearchOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import Link from 'next/link'

export default function TeacherListPage() {
  const [teachers, setTeachers] = useState<Teachers[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedCareer, setSelectedCareer] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(12)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const supabase = createClient()

  const fetchTeachers = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('teachers')
        .select(`
          id,
          first_name,
          last_name,
          email,
          avatar_url,
          degree,
          is_active,
          created_at,
          teacher_subjects (
            subjects (
              id,
              name,
              code,
              credits
            )
          ),
          teacher_reviews (
            rating
          )
        `, { count: 'exact' })
        .eq('is_active', true)

      if (debouncedSearchTerm) {
        query = query.or(
          `first_name.ilike.%${debouncedSearchTerm}%,` +
          `last_name.ilike.%${debouncedSearchTerm}%,` +
          `email.ilike.%${debouncedSearchTerm}%`
        )
      }

      if (selectedSubject) {
        query = query.eq('teacher_subjects.subjects.id', selectedSubject)
      }

      const sortField = sortBy === 'name' ? 'first_name' : 'created_at'
      query = query.order(sortField, { ascending: sortOrder === 'asc' })

      const from = (currentPage - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      const processedTeachers = data?.map(teacher => {
        const reviews = teacher.teacher_reviews || []
        const averageRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

        const subjectsArray = teacher.teacher_subjects
          ?.map(ts => ts.subjects)
          .filter(subject => subject !== null) || []

        const flatSubjects = subjectsArray.flatMap((s: any) =>
          Array.isArray(s) ? s : [s]
        ).filter(
          (subject: any) =>
            subject &&
            typeof subject.id === 'string' &&
            typeof subject.name === 'string' &&
            typeof subject.code === 'string' &&
            typeof subject.credits === 'number'
        ) as { id: string; name: string; code: string; credits: number }[]

        const uniqueSubjects = flatSubjects.filter(
          (subject, index, self) =>
            index === self.findIndex(s => s.id === subject.id)
        )

        return {
          ...teacher,
          subjects: uniqueSubjects,
          average_rating: Math.round(averageRating * 10) / 10,
          total_reviews: reviews.length
        }
      }) || []

      setTeachers(processedTeachers)
      setTotalCount(count || 0)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchTerm, selectedSubject, selectedCareer, sortBy, sortOrder, currentPage, pageSize])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedSubject, selectedCareer, sortBy, sortOrder])

  const Pagination = () => {
    const totalPages = Math.ceil(totalCount / pageSize)

    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          Anterior
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === page
                    ? 'bg-[#53ad35] text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          Siguiente
        </button>
      </div>
    )
  }

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [subjectsData, careersData] = await Promise.all([
        supabase.from('subjects').select('id, name, code').eq('is_active', true).order('name'),
        supabase.from('careers').select('id, name, short_name').eq('is_active', true).order('name')
      ])

      setSubjects(subjectsData.data || [])
      setCareers(careersData.data || [])
    } catch (error) {
      console.error('Error fetching initial data:', error)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSubject('')
    setSelectedCareer('')
    setSortBy('name')
    setSortOrder('asc')
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedSubject) count++
    if (selectedCareer) count++
    if (sortBy !== 'name' || sortOrder !== 'asc') count++
    return count
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < Math.floor(rating)
          ? 'text-yellow-400'
          : index < rating
            ? 'text-yellow-200'
            : 'text-gray-300'
          }`}
      />
    ))
  }

  const TeacherCard = ({ teacher, index }: { teacher: Teachers; index: number }) => (
    <motion.div
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#53ad35]/20 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      layout
    >
      {/* Card Header */}
      <div className="relative p-6 pb-4">
        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Avatar & Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            {teacher.avatar_url ? (
              <img
                src={teacher.avatar_url}
                alt={`${teacher.first_name} ${teacher.last_name}`}
                className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#53ad35] to-[#34a32a] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <FaUser className="text-white text-xl" />
              </div>
            )}

            {/* Rating Badge */}
            {teacher.average_rating > 0 && (
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {teacher.average_rating.toFixed(1)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#53ad35] transition-colors duration-300 truncate">
              {teacher.degree} {teacher.first_name} {teacher.last_name}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <IoMailOutline className="mr-1" />
              <span className="truncate">{teacher.email}</span>
            </div>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(teacher.average_rating)}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {teacher.average_rating > 0 ? teacher.average_rating.toFixed(1) : 'N/A'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-lg">
            <FaComment />
            <span>{teacher.total_reviews}</span>
          </div>
        </div>

        {/* Subjects Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <FaBook className="mr-2 text-[#53ad35]" />
              Materias
            </h4>
            <span className="text-xs bg-[#53ad35]/10 text-[#53ad35] px-2 py-1 rounded-full font-medium">
              {teacher.subjects.length}
            </span>
          </div>

          <div className="space-y-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {teacher.subjects.slice(0, 2).map((subject) => (
              <div
                key={subject.id}
                className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-3 py-2 flex items-center justify-between border border-gray-200"
              >
                <span className="font-semibold text-[#53ad35]">{subject.code}</span>
                <span className="text-gray-600 truncate ml-2">{subject.name}</span>
              </div>
            ))}
            {teacher.subjects.length > 2 && (
              <div className="text-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  +{teacher.subjects.length - 2} más
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6">
        <div className="flex space-x-2">
          <Link href={`/teachers-list/${teacher.id}`}
            className="w-full bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-[1.02]"
          >
            <FaEye />
            <span>Ver Perfil</span>
          </Link>
          <motion.button
            onClick={() => window.open(`mailto:${teacher.email}`, '_blank')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaEnvelope />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )

  const TeacherListItem = ({ teacher, index }: { teacher: Teachers; index: number }) => (
    <motion.div
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#53ad35]/20 transition-all duration-300 p-4 lg:p-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ x: 8 }}
      layout
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0 self-start sm:self-center">
          {teacher.avatar_url ? (
            <img
              src={teacher.avatar_url}
              alt={`${teacher.first_name} ${teacher.last_name}`}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#53ad35] to-[#34a32a] flex items-center justify-center shadow-md">
              <FaUser className="text-white text-lg" />
            </div>
          )}
          {teacher.average_rating > 0 && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {teacher.average_rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#53ad35] transition-colors duration-300 truncate">
                {teacher.first_name} {teacher.last_name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                {teacher.degree && (
                  <span className="flex items-center">
                    <FaCertificate className="mr-1 text-[#53ad35]" />
                    {teacher.degree}
                  </span>
                )}
                <span className="hidden lg:inline">•</span>
                <span className="flex items-center truncate">
                  <IoMailOutline className="mr-1" />
                  {teacher.email}
                </span>
                <span className="hidden lg:inline">•</span>
                <span className="flex items-center">
                  <FaBook className="mr-1 text-[#53ad35]" />
                  {teacher.subjects.length} materias
                </span>
              </div>
            </div>

            {/* Actions & Rating */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Rating */}
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                <div className="flex items-center space-x-1">
                  {renderStars(teacher.average_rating)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ({teacher.total_reviews})
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Link href={`/teachers-list/${teacher.id}`}
                  className="bg-[#53ad35] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#34a32a] transition-colors duration-300 flex items-center space-x-1"
                >
                  <FaEye />
                  <span className="hidden sm:inline">Ver Perfil</span>
                </Link>
                <motion.button
                  onClick={() => window.open(`mailto:${teacher.email}`, '_blank')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const statsData = [
    {
      label: 'Total Profesores',
      value: teachers.length,
      icon: FaUsers,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Promedio Rating',
      value: teachers.length > 0 ? (teachers.reduce((sum, t) => sum + t.average_rating, 0) / teachers.length).toFixed(1) : '0',
      icon: FaStar,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Total Reseñas',
      value: teachers.reduce((sum, t) => sum + t.total_reviews, 0),
      icon: FaComment,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Materias Únicas',
      value: new Set(teachers.flatMap(t => t.subjects.map(s => s.id))).size,
      icon: FaBook,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SectionContainer className="py-6 lg:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#53ad35]/10 to-[#34a32a]/10 rounded-full text-[#53ad35] text-sm font-semibold mb-6 shadow-lg">
            <FaUserTie className="mr-2" />
            Listado Académico FIME
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] bg-clip-text text-transparent">
              Profesores
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Descubre y conecta con nuestro destacado cuerpo docente. Encuentra información detallada sobre sus especialidades, calificaciones y experiencia académica.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-3 lg:mb-4 shadow-lg`}>
                <stat.icon className="text-white text-xl lg:text-2xl" />
              </div>
              <div className="text-xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 lg:p-8 mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Buscar profesores por nombre, email, materia o especialidad..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none transition-all duration-300 text-lg placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseOutline className="text-xl" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                <IoFilterOutline />
                <span>Filtros</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-[#53ad35] text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {/* Desktop Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                <IoFilterOutline />
                <span>Filtros Avanzados</span>
                <FaChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-[#53ad35] text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden sm:inline">Vista:</span>
                <div className="bg-gray-100 rounded-xl p-1 flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                      ? 'bg-white shadow-md text-[#53ad35]'
                      : 'text-gray-600 hover:text-gray-800'
                      }`}
                  >
                    <IoGridOutline className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                      ? 'bg-white shadow-md text-[#53ad35]'
                      : 'text-gray-600 hover:text-gray-800'
                      }`}
                  >
                    <IoListOutline className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end space-x-4">
              <span className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <span className="font-semibold text-[#53ad35]">{teachers.length}</span> de {teachers.length} profesores
              </span>
            </div>
          </div>

          {/* Advanced Filters - Desktop */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  {/* Subject Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Filtrar por Materia
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="">Todas las materias</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.code} - {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Career Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Filtrar por Carrera
                    </label>
                    <select
                      value={selectedCareer}
                      onChange={(e) => setSelectedCareer(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="">Todas las carreras</option>
                      {careers.map((career) => (
                        <option key={career.id} value={career.id}>
                          {career.short_name || career.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Ordenar por
                    </label>
                    <div className="flex space-x-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none transition-all duration-300"
                      >
                        <option value="name">Nombre</option>
                        <option value="rating">Calificación</option>
                        <option value="reviews">Reseñas</option>
                        <option value="subjects">Materias</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-4 py-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                      >
                        <FaSort className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {getActiveFiltersCount() > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#53ad35] hover:text-[#34a32a] font-semibold bg-[#53ad35]/10 hover:bg-[#53ad35]/20 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  {/* Subject Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Materia
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                    >
                      <option value="">Todas las materias</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.code} - {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Career Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Carrera
                    </label>
                    <select
                      value={selectedCareer}
                      onChange={(e) => setSelectedCareer(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                    >
                      <option value="">Todas las carreras</option>
                      {careers.map((career) => (
                        <option key={career.id} value={career.id}>
                          {career.short_name || career.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ordenar por
                    </label>
                    <div className="flex space-x-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                      >
                        <option value="name">Nombre</option>
                        <option value="rating">Calificación</option>
                        <option value="reviews">Reseñas</option>
                        <option value="subjects">Materias</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        <FaSort className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full text-sm text-[#53ad35] hover:text-[#34a32a] font-semibold bg-[#53ad35]/10 hover:bg-[#53ad35]/20 py-3 rounded-xl transition-all duration-300"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Teachers Grid/List con skeleton loading */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: pageSize }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-2xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {teachers.map((teacher, index) => (
                  viewMode === 'grid' ? (
                    <TeacherCard key={teacher.id} teacher={teacher} index={index} />
                  ) : (
                    <TeacherListItem key={teacher.id} teacher={teacher} index={index} />
                  )
                ))}
              </motion.div>

              <Pagination />
            </>
          )}
        </div>
      </SectionContainer>
    </div>
  )
}