'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'
import SectionContainer from '@/components/ui/section-container/SectionContainer'
import {
  FaUser,
  FaStar,
  FaBook,
  FaComment,
  FaArrowLeft,
  FaExclamationTriangle,
  FaUsers,
  FaQuoteLeft,
  FaUserGraduate,
  FaBookOpen
} from 'react-icons/fa'
import {
  IoMailOutline,
  IoBarChartOutline
} from 'react-icons/io5'
import { useEffect as useAuthEffect, useState as useAuthState } from 'react'
import { User } from '@supabase/supabase-js'

interface Teacher {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar_url?: string
  degree?: string
  is_active: boolean
  created_at: string
  subjects: Array<{
    id: string
    name: string
    code: string
    credits: number
  }>
  reviews: Array<{
    id: string
    rating: number
    comment: string
    subject: string
    semester: string
    is_anonymous: boolean
    created_at: string
    user: {
      full_name?: string
    }
  }>
  stats: {
    total_reviews: number
    average_rating: number
    rating_distribution: { [key: number]: number }
    total_students: number
    subjects_count: number
  }
}

export default function TeacherProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null)
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('')
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
    subject: '',
    semester: '',
    is_anonymous: false
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  const supabase = createClient()
  const teacherId = params.id as string

  useEffect(() => {
    if (teacherId) {
      fetchTeacherProfile()
    }
  }, [teacherId])

  const fetchTeacherProfile = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .select(`
          id,
          first_name,
          last_name,
          email,
          avatar_url,
          degree,
          is_active,
          created_at
        `)
        .eq('id', teacherId)
        .single()

      if (teacherError) throw teacherError
      if (!teacherData) throw new Error('Profesor no encontrado')

      const { data: subjectsData } = await supabase
        .from('teacher_subjects')
        .select(`
          subjects (
            id,
            name,
            code,
            credits
          )
        `)
        .eq('teacher_id', teacherId)
        .eq('is_active', true)

      type ReviewWithProfile = {
        id: string
        rating: number
        comment: string
        subject: string
        semester: string
        is_anonymous: boolean
        created_at: string
        user_id: string
        profiles?: { full_name?: string } | { full_name?: string }[]
      }

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('teacher_reviews')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false })

      console.log('Reviews data:', reviewsData)
      console.log('Reviews error:', reviewsError)

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError)
      }

      let processedReviews: any[] = []
      
      if (reviewsData && reviewsData.length > 0) {
        const userIds = [...new Set(reviewsData.map(r => r.user_id))]
        
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds)

        console.log('Profiles data:', profilesData)

        processedReviews = reviewsData.map(review => ({
          ...review,
          user: {
            full_name: review.is_anonymous
              ? 'Usuario Anónimo'
              : profilesData?.find(p => p.id === review.user_id)?.full_name || 'Usuario'
          }
        }))
      }

      const allSubjects = (subjectsData ?? []).map(ts => ts.subjects).filter(Boolean).flat()
      const uniqueSubjects = allSubjects.filter(
        (subject, index, self) =>
          subject && index === self.findIndex(s => s && s.id === subject.id)
      )

      const totalReviews = processedReviews.length
      const averageRating = totalReviews > 0 
        ? processedReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
        : 0

      const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      processedReviews.forEach(review => {
        ratingDistribution[review.rating]++
      })

      const teacherProfile: Teacher = {
        ...teacherData,
        subjects: uniqueSubjects,
        reviews: processedReviews,
        stats: {
          total_reviews: processedReviews.length,
          average_rating: Math.round(averageRating * 10) / 10,
          rating_distribution: ratingDistribution,
          total_students: processedReviews.length,
          subjects_count: uniqueSubjects.length
        }
      }

      setTeacher(teacherProfile)
    } catch (err: any) {
      setError(err.message || 'Error al cargar el perfil del profesor')
      console.error('Error fetching teacher profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredReviews = () => {
    if (!teacher) return []
    
    let filtered = teacher.reviews

    if (selectedRatingFilter) {
      filtered = filtered.filter(review => review.rating === selectedRatingFilter)
    }

    if (selectedSubjectFilter) {
      filtered = filtered.filter(review => 
        review.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase())
      )
    }

    return showAllReviews ? filtered : filtered.slice(0, 5)
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl'
    }[size]

    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${sizeClass} ${
          index < Math.floor(rating) 
            ? 'text-yellow-400' 
            : index < rating 
            ? 'text-yellow-200' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4) return 'text-yellow-600'
    if (rating >= 3) return 'text-orange-600'
    return 'text-red-600'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  useAuthEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const submitReview = async () => {
    if (!user || !teacher) return

    setSubmittingReview(true)
    try {
      const { error } = await supabase
        .from('teacher_reviews')
        .insert({
          teacher_id: teacher.id,
          user_id: user.id,
          rating: reviewForm.rating,
          comment: reviewForm.comment.trim(),
          subject: reviewForm.subject,
          semester: reviewForm.semester,
          is_anonymous: reviewForm.is_anonymous
        })

      if (error) throw error

      setReviewForm({
        rating: 5,
        comment: '',
        subject: '',
        semester: '',
        is_anonymous: false
      })
      setShowReviewForm(false)

      await fetchTeacherProfile()

      alert('¡Reseña agregada exitosamente!')
    } catch (error: any) {
      console.error('Error submitting review:', error)
      alert('Error al enviar la reseña: ' + error.message)
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <SectionContainer className="min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 border-4 border-[#53ad35]/20 border-t-[#53ad35] rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cargando perfil...</h3>
            <p className="text-gray-600">Obteniendo información del profesor</p>
          </motion.div>
        </SectionContainer>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <SectionContainer className="min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Profesor no encontrado</h3>
            <p className="text-gray-600 mb-8">{error || 'El profesor que buscas no existe o ha sido eliminado.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.back()}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
              <button 
                onClick={() => router.push('/teachers-list')}
                className="bg-[#53ad35] text-white px-6 py-3 rounded-xl hover:bg-[#34a32a] transition-colors"
              >
                Ver todos los profesores
              </button>
            </div>
          </motion.div>
        </SectionContainer>
      </div>
    )
  }

  const filteredReviews = getFilteredReviews()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SectionContainer className="py-6 lg:py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#53ad35] hover:cursor-pointer transition-colors mb-6 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver a la lista</span>
        </motion.button>

        {/* Header Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-10 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative">
              {teacher.avatar_url ? (
                <img
                  src={teacher.avatar_url}
                  alt={`${teacher.first_name} ${teacher.last_name}`}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover shadow-2xl"
                />
              ) : (
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-[#53ad35] to-[#34a32a] flex items-center justify-center shadow-2xl">
                  <FaUser className="text-white text-4xl lg:text-5xl" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {teacher.degree} {teacher.first_name} {teacher.last_name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <IoMailOutline className="mr-2" />
                    <a href={`mailto:${teacher.email}`} className="hover:text-[#53ad35] transition-colors">
                      {teacher.email}
                    </a>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white rounded-2xl p-6 text-center min-w-[200px]">
                  <div className="text-3xl font-bold mb-2">
                    {teacher.stats.average_rating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {renderStars(teacher.stats.average_rating, 'sm')}
                  </div>
                  <div className="text-sm opacity-90">
                    {teacher.stats.total_reviews} reseñas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              label: 'Materias Impartidas',
              value: teacher.stats.subjects_count,
              icon: FaBook,
              color: 'from-blue-500 to-blue-600'
            },
            {
              label: 'Total Estudiantes',
              value: teacher.stats.total_students,
              icon: FaUsers,
              color: 'from-green-500 to-green-600'
            },
            {
              label: 'Rating Promedio',
              value: teacher.stats.average_rating.toFixed(1),
              icon: FaStar,
              color: 'from-yellow-500 to-yellow-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Subjects */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaBookOpen className="mr-3 text-[#53ad35]" />
                Materias Impartidas
              </h3>
              <div className="space-y-3">
                {teacher.subjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#53ad35]">{subject.code}</span>
                      <span className="bg-[#53ad35]/10 text-[#53ad35] text-xs px-2 py-1 rounded-full font-medium">
                        {subject.credits} créditos
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{subject.name}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <IoBarChartOutline className="mr-3 text-[#53ad35]" />
                Distribución de Calificaciones
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = teacher.stats.rating_distribution[rating] || 0
                  const percentage = teacher.stats.total_reviews > 0 
                    ? (count / teacher.stats.total_reviews) * 100 
                    : 0

                  return (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 min-w-[80px]">
                        <span className="text-sm font-medium text-gray-700">{rating}</span>
                        <FaStar className="text-yellow-400 text-sm" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 min-w-[40px]">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Reviews */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaComment className="mr-3 text-[#53ad35]" />
                  Reseñas de Estudiantes ({teacher.stats.total_reviews})
                </h3>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <select
                    value={selectedRatingFilter || ''}
                    onChange={(e) => setSelectedRatingFilter(e.target.value ? Number(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                  >
                    <option value="">Todas las calificaciones</option>
                    <option value="5">5 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="2">2 estrellas</option>
                    <option value="1">1 estrella</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Filtrar por materia..."
                    value={selectedSubjectFilter}
                    onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-full flex items-center justify-center">
                              <FaUserGraduate className="text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.user.full_name}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{review.subject}</span>
                                <span>•</span>
                                <span>{review.semester}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating, 'sm')}
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDate(review.created_at)}
                            </span>
                          </div>
                        </div>

                        {review.comment && (
                          <div className="relative">
                            <FaQuoteLeft className="absolute top-0 left-0 text-[#53ad35]/20 text-2xl" />
                            <p className="text-gray-700 leading-relaxed pl-8 italic">
                              "{review.comment}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <FaComment className="text-4xl text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        No hay reseñas con esos filtros
                      </h4>
                      <p className="text-gray-600">
                        Intenta ajustar los filtros para ver más reseñas
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Show More Button */}
              {teacher.reviews.length > 5 && !showAllReviews && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Ver todas las reseñas ({teacher.reviews.length})
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Add Review Section */}
        {user && (
          <motion.div
            className="bg-gradient-to-r from-[#53ad35]/5 to-[#34a32a]/5 rounded-2xl border-2 border-dashed border-[#53ad35]/20 p-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                <FaStar className="mr-2 text-[#53ad35]" />
                Comparte tu experiencia
              </h4>
              <p className="text-gray-600">
                ¿Has tomado clases con {teacher.first_name}? Ayuda a otros estudiantes compartiendo tu opinión
              </p>
            </div>

            {!showReviewForm ? (
              <motion.button
                onClick={() => setShowReviewForm(true)}
                className="w-full bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaComment />
                <span>Escribir Reseña</span>
              </motion.button>
            ) : (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Calificación *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-3xl transition-colors ${
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaStar />
                      </motion.button>
                    ))}
                    <span className="ml-4 text-sm text-gray-600 font-medium">
                      {reviewForm.rating} de 5 estrellas
                    </span>
                  </div>
                </div>

                {/* Subject and Semester */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Materia *
                    </label>
                    <select
                      value={reviewForm.subject}
                      onChange={(e) => setReviewForm({ ...reviewForm, subject: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Selecciona una materia</option>
                      {teacher.subjects.map((subject) => (
                        <option key={subject.id} value={subject.name}>
                          {subject.code} - {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Semestre *
                    </label>
                    <select
                      value={reviewForm.semester}
                      onChange={(e) => setReviewForm({ ...reviewForm, semester: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Selecciona el semestre</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comentario (opcional)
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Comparte tu experiencia con este profesor. ¿Cómo fueron las clases? ¿Qué recomendarías a otros estudiantes?"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#53ad35] focus:border-transparent outline-none resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {reviewForm.comment.length}/500 caracteres
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={reviewForm.is_anonymous}
                    onChange={(e) => setReviewForm({ ...reviewForm, is_anonymous: e.target.checked })}
                    className="w-4 h-4 text-[#53ad35] bg-gray-100 border-gray-300 rounded focus:ring-[#53ad35] focus:ring-2"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Publicar como anónimo
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={submitReview}
                    disabled={!reviewForm.rating || !reviewForm.subject || !reviewForm.semester || submittingReview}
                    className="flex-1 bg-gradient-to-r from-[#53ad35] to-[#34a32a] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: submittingReview ? 1 : 1.02 }}
                    whileTap={{ scale: submittingReview ? 1 : 0.98 }}
                  >
                    {submittingReview ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FaStar />
                        <span>Publicar Reseña</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setShowReviewForm(false)
                      setReviewForm({
                        rating: 5,
                        comment: '',
                        subject: '',
                        semester: '',
                        is_anonymous: false
                      })
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Login Prompt for Non-Authenticated Users */}
        {!user && (
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="mb-4">
              <FaUser className="text-4xl text-blue-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                ¿Quieres dejar una reseña?
              </h4>
              <p className="text-gray-600 mb-4">
                Inicia sesión para compartir tu experiencia con {teacher.first_name} y ayudar a otros estudiantes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => router.push('/auth/login')}
                className="bg-blue-500 hover:cursor-pointer text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Iniciar Sesión
              </motion.button>
              <motion.button
                onClick={() => router.push('/auth/register')}
                className="bg-gray-100 hover:cursor-pointer hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Crear Cuenta
              </motion.button>
            </div>
          </motion.div>
        )}
      </SectionContainer>
    </div>
  )
}