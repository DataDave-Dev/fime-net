'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaBook,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaCode,
    FaGraduationCap,
    FaTimes,
    FaSave,
    FaToggleOn,
    FaToggleOff,
    FaFilter,
    FaFlask,
} from 'react-icons/fa'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Subject, SubjectFormData } from '@/types/interface'

const SUBJECT_TYPES = [
    'Obligatoria',
    'Optativa',
    'Especialización',
    'Servicio Social',
    'Prácticas Profesionales'
]

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [creating, setCreating] = useState(false)
    const [updating, setUpdating] = useState(false)

    const [formData, setFormData] = useState<SubjectFormData>({
        name: '',
        code: '',
        credits: 0,
        subject_type: 'Obligatoria',
        description: '',
        prerequisites: [],
        is_laboratory: false
    })

    const [errors, setErrors] = useState<Partial<Record<keyof SubjectFormData, string>>>({})

    const { user } = useAuth()
    const supabase = createClient()

    useEffect(() => {
        fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                .order('subject_type', { ascending: true })
                .order('name', { ascending: true })

            if (error) throw error
            setSubjects(data || [])
        } catch (error: any) {
            console.error('Error fetching subjects:', error)
        } finally {
            setLoading(false)
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof SubjectFormData, string>> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio'
        }

        if (!formData.code.trim()) {
            newErrors.code = 'El código es obligatorio'
        } else if (formData.code.length < 2) {
            newErrors.code = 'El código debe tener al menos 2 caracteres'
        }

        if (formData.credits < 1 || formData.credits > 10) {
            newErrors.credits = 'Los créditos deben estar entre 1 y 10'
        }

        if (!formData.subject_type) {
            newErrors.subject_type = 'El tipo de materia es obligatorio'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'credits' ? parseInt(value) || 0 : value
            }))
        }

        if (errors[name as keyof SubjectFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            credits: 0,
            subject_type: 'Obligatoria',
            description: '',
            prerequisites: [],
            is_laboratory: false
        })
        setErrors({})
        setEditingSubject(null)
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setCreating(true)
        try {
            const { data: existingSubject } = await supabase
                .from('subjects')
                .select('code')
                .eq('code', formData.code.toUpperCase())
                .single()

            if (existingSubject) {
                setErrors({ code: 'Ya existe una materia con este código' })
                setCreating(false)
                return
            }

            const { data, error } = await supabase
                .from('subjects')
                .insert([{
                    name: formData.name.trim(),
                    code: formData.code.toUpperCase().trim(),
                    credits: formData.credits,
                    subject_type: formData.subject_type,
                    description: formData.description.trim() || null,
                    prerequisites: formData.prerequisites.length > 0 ? formData.prerequisites : null,
                    is_laboratory: formData.is_laboratory,
                    is_active: true
                }])
                .select()

            if (error) throw error

            setSubjects([...subjects, data[0]])
            resetForm()
            setShowCreateForm(false)
        } catch (error: any) {
            console.error('Error creating subject:', error)
        } finally {
            setCreating(false)
        }
    }

    const handleEdit = (subject: Subject) => {
        setFormData({
            name: subject.name,
            code: subject.code,
            credits: subject.credits,
            subject_type: subject.subject_type,
            description: subject.description || '',
            prerequisites: subject.prerequisites || [],
            is_laboratory: subject.is_laboratory
        })
        setEditingSubject(subject)
        setShowCreateForm(true)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm() || !editingSubject) return

        setUpdating(true)
        try {
            // Verificar código único (excluyendo el actual)
            if (formData.code.toUpperCase() !== editingSubject.code) {
                const { data: existingSubject } = await supabase
                    .from('subjects')
                    .select('code')
                    .eq('code', formData.code.toUpperCase())
                    .neq('id', editingSubject.id)
                    .single()

                if (existingSubject) {
                    setErrors({ code: 'Ya existe otra materia con este código' })
                    setUpdating(false)
                    return
                }
            }

            const { data, error } = await supabase
                .from('subjects')
                .update({
                    name: formData.name.trim(),
                    code: formData.code.toUpperCase().trim(),
                    credits: formData.credits,
                    subject_type: formData.subject_type,
                    description: formData.description.trim() || null,
                    prerequisites: formData.prerequisites.length > 0 ? formData.prerequisites : null,
                    is_laboratory: formData.is_laboratory,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingSubject.id)
                .select()

            if (error) throw error

            setSubjects(subjects.map(s => s.id === editingSubject.id ? data[0] : s))
            resetForm()
            setShowCreateForm(false)
        } catch (error: any) {
            console.error('Error updating subject:', error)
        } finally {
            setUpdating(false)
        }
    }

    const handleToggleStatus = async (subject: Subject) => {
        try {
            const { data, error } = await supabase
                .from('subjects')
                .update({
                    is_active: !subject.is_active,
                    updated_at: new Date().toISOString()
                })
                .eq('id', subject.id)
                .select()

            if (error) throw error

            setSubjects(subjects.map(s => s.id === subject.id ? data[0] : s))
        } catch (error: any) {
            console.error('Error toggling subject status:', error)
        }
    }

    const handleDelete = async (subject: Subject) => {
        if (!confirm(`¿Estás seguro de eliminar la materia "${subject.name}"?`)) return

        try {
            const { error } = await supabase
                .from('subjects')
                .delete()
                .eq('id', subject.id)

            if (error) throw error

            setSubjects(subjects.filter(s => s.id !== subject.id))
        } catch (error: any) {
            console.error('Error deleting subject:', error)
        }
    }

    const filteredSubjects = subjects.filter(subject => {
        const matchesSearch = !searchTerm || 
            subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = typeFilter === 'all' || subject.subject_type === typeFilter

        const matchesStatus = statusFilter === 'all' || 
            (statusFilter === 'active' && subject.is_active) ||
            (statusFilter === 'inactive' && !subject.is_active)

        return matchesSearch && matchesType && matchesStatus
    })

    if (loading) {
        return (
            <div className="min-h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-[#53ad35]/20 border-t-[#53ad35] rounded-full animate-spin mx-auto"></div>
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-700">Cargando materias</p>
                        <p className="text-gray-500">Obteniendo datos del sistema...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl"
            >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <FaBook className="text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">Materias</h1>
                                <p className="text-xl text-white/90">Gestión del Plan de Estudios</p>
                            </div>
                        </div>
                        <p className="text-lg text-white/80 max-w-2xl">
                            Administra todas las materias del plan de estudios y sus créditos
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            resetForm()
                            setShowCreateForm(true)
                        }}
                        className="mt-6 lg:mt-0 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                    >
                        <FaPlus className="text-lg" />
                        <span>Nueva Materia</span>
                    </motion.button>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
                {[
                    {
                        title: "Total Materias",
                        value: subjects.length,
                        icon: FaBook,
                        color: "from-blue-500 to-blue-600"
                    },
                    {
                        title: "Materias Activas",
                        value: subjects.filter(s => s.is_active).length,
                        icon: FaToggleOn,
                        color: "from-green-500 to-green-600"
                    },
                    {
                        title: "Total Créditos",
                        value: subjects.reduce((acc, s) => acc + s.credits, 0),
                        icon: FaGraduationCap,
                        color: "from-purple-500 to-purple-600"
                    },
                    {
                        title: "Con Laboratorio",
                        value: subjects.filter(s => s.is_laboratory).length,
                        icon: FaFlask,
                        color: "from-orange-500 to-orange-600"
                    }
                ].map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="text-white text-2xl" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2">
                            <FaFilter className="text-gray-400" />
                            <select
                                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">Todos los tipos</option>
                                {SUBJECT_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        
                        <select
                            className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Solo activas</option>
                            <option value="inactive">Solo inactivas</option>
                        </select>
                        
                        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                            {filteredSubjects.length} resultado{filteredSubjects.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Create/Edit Form Modal */}
            <AnimatePresence>
                {showCreateForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowCreateForm(false)
                            resetForm()
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <FaBook className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                {editingSubject ? 'Editar Materia' : 'Nueva Materia'}
                                            </h3>
                                            <p className="text-white/80">
                                                {editingSubject ? 'Modifica la información de la materia' : 'Agrega una nueva materia al plan de estudios'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowCreateForm(false)
                                            resetForm()
                                        }}
                                        className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={editingSubject ? handleUpdate : handleCreate} className="p-6 space-y-6">
                                {/* Información Básica */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                        Información Básica
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <FaBook className="inline mr-2 text-blue-600" />
                                                Nombre de la Materia *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all ${
                                                    errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                                placeholder="Ej: Cálculo Diferencial"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <FaCode className="inline mr-2 text-blue-600" />
                                                Código *
                                            </label>
                                            <input
                                                type="text"
                                                name="code"
                                                value={formData.code}
                                                onChange={handleInputChange}
                                                className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all uppercase ${
                                                    errors.code ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                                placeholder="Ej: MAT101"
                                                required
                                            />
                                            {errors.code && (
                                                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tipo de Materia *
                                            </label>
                                            <select
                                                name="subject_type"
                                                value={formData.subject_type}
                                                onChange={handleInputChange}
                                                className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all ${
                                                    errors.subject_type ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                                required
                                            >
                                                {SUBJECT_TYPES.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {errors.subject_type && (
                                                <p className="mt-1 text-sm text-red-600">{errors.subject_type}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Créditos *
                                            </label>
                                            <select
                                                name="credits"
                                                value={formData.credits}
                                                onChange={handleInputChange}
                                                className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all ${
                                                    errors.credits ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                                required
                                            >
                                                <option value={0}>Seleccionar créditos...</option>
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map(credit => (
                                                    <option key={credit} value={credit}>
                                                        {credit} crédito{credit !== 1 ? 's' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.credits && (
                                                <p className="mt-1 text-sm text-red-600">{errors.credits}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Información Adicional */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                        Información Adicional
                                    </h4>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                            placeholder="Descripción breve de la materia..."
                                        />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            name="is_laboratory"
                                            checked={formData.is_laboratory}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-semibold text-gray-700">
                                            <FaFlask className="inline mr-2 text-blue-600" />
                                            Es materia de laboratorio
                                        </label>
                                    </div>
                                </div>

                                {/* Preview */}
                                {(formData.name || formData.code) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4"
                                    >
                                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                            <FaEye className="mr-2 text-blue-600" />
                                            Vista Previa
                                        </h4>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            {formData.name && <p><strong>Materia:</strong> {formData.name}</p>}
                                            {formData.code && <p><strong>Código:</strong> {formData.code.toUpperCase()}</p>}
                                            {formData.subject_type && <p><strong>Tipo:</strong> {formData.subject_type}</p>}
                                            {formData.credits > 0 && <p><strong>Créditos:</strong> {formData.credits}</p>}
                                            {formData.is_laboratory && <p><strong>Laboratorio:</strong> Sí</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateForm(false)
                                            resetForm()
                                        }}
                                        className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={creating || updating}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                                            creating || updating
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        {creating || updating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>{editingSubject ? 'Actualizando...' : 'Creando...'}</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaSave />
                                                <span>{editingSubject ? 'Actualizar Materia' : 'Crear Materia'}</span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subjects Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
            >
                {filteredSubjects.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <FaBook className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                                ? 'No se encontraron materias' 
                                : 'No hay materias registradas'
                            }
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                                ? 'Intenta ajustar los filtros de búsqueda'
                                : 'Comienza creando tu primera materia del plan de estudios'
                            }
                        </p>
                        {!searchTerm && typeFilter === 'all' && statusFilter === 'all' && (
                            <button
                                onClick={() => {
                                    resetForm()
                                    setShowCreateForm(true)
                                }}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                            >
                                Crear Primera Materia
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubjects.map((subject, index) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                                            subject.is_active 
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                                                : 'bg-gradient-to-br from-gray-400 to-gray-500'
                                        }`}>
                                            {subject.code.substring(0, 3)}
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                                                subject.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {subject.is_active ? 'Activa' : 'Inactiva'}
                                            </span>
                                            {subject.is_laboratory && (
                                                <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium bg-orange-100 text-orange-800">
                                                    Laboratorio
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                                        <button
                                            onClick={() => handleEdit(subject)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Editar materia"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(subject)}
                                            className={`p-2 rounded-lg transition-all ${
                                                subject.is_active 
                                                    ? 'text-orange-600 hover:bg-orange-50' 
                                                    : 'text-green-600 hover:bg-green-50'
                                            }`}
                                            title={subject.is_active ? 'Desactivar' : 'Activar'}
                                        >
                                            {subject.is_active ? <FaToggleOff /> : <FaToggleOn />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(subject)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Eliminar materia"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                                {/* Subject Info */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                            {subject.name}
                                        </h3>
                                        <p className="text-blue-600 font-semibold">{subject.code}</p>
                                        <p className="text-sm text-gray-500">{subject.subject_type}</p>
                                    </div>

                                    {subject.description && (
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {subject.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <FaGraduationCap className="text-purple-500" />
                                            <span className="text-gray-700 font-medium">
                                                {subject.credits} crédito{subject.credits !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">
                                                {subject.subject_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}