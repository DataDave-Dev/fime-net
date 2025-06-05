'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    FaLink,
    FaChalkboardTeacher,
    FaBook,
    FaPlus,
    FaTrash,
    FaSearch,
    FaFilter,
    FaCalendarAlt,
    FaUsers
} from 'react-icons/fa'
import { createClient } from '@/utils/supabase/client'
import { Teacher, Subject, TeacherSubject } from '@/types/interface'

export default function TeacherAssignmentsPage() {
    const [assignments, setAssignments] = useState<TeacherSubject[]>([])
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [semesterFilter, setSemesterFilter] = useState<string>('all')

    const [newAssignment, setNewAssignment] = useState({
        teacher_id: '',
        subject_id: '',
        semester: ''
    })

    const supabase = createClient()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)

            const { data: assignmentsData, error: assignmentsError } = await supabase
                .from('teacher_subjects')
                .select(`
          *,
          teacher:teachers(*),
          subject:subjects(*)
        `)
                .order('created_at', { ascending: false })

            if (assignmentsError) throw assignmentsError

            const { data: teachersData, error: teachersError } = await supabase
                .from('teachers')
                .select('*')
                .eq('is_active', true)
                .order('first_name')

            if (teachersError) throw teachersError

            const { data: subjectsData, error: subjectsError } = await supabase
                .from('subjects')
                .select('*')
                .eq('is_active', true)
                .order('name')

            if (subjectsError) throw subjectsError

            setAssignments(assignmentsData || [])
            setTeachers(teachersData || [])
            setSubjects(subjectsData || [])
        } catch (error: any) {
            console.error('Error fetching data:', error)
            alert('Error al cargar los datos: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateAssignment = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newAssignment.teacher_id || !newAssignment.subject_id || !newAssignment.semester) {
            alert('Todos los campos son obligatorios')
            return
        }

        try {
            const { data, error } = await supabase
                .from('teacher_subjects')
                .insert([
                    {
                        teacher_id: newAssignment.teacher_id,
                        subject_id: newAssignment.subject_id,
                        semester: newAssignment.semester,
                        is_active: true
                    }
                ])
                .select(`
                *,
                teacher:teachers(*),
                subject:subjects(*)
            `)

            if (error) throw error

            setAssignments([...assignments, data[0]])
            setNewAssignment({
                teacher_id: '',
                subject_id: '',
                semester: ''
                // ← Grupo removido
            })
            setShowCreateForm(false)
        } catch (error: any) {
            console.error('Error creating assignment:', error)
            alert('Error al crear la asignación: ' + error.message)
        }
    }

    const handleDeleteAssignment = async (assignmentId: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta asignación?')) {
            return
        }

        try {
            const { error } = await supabase
                .from('teacher_subjects')
                .delete()
                .eq('id', assignmentId)

            if (error) throw error

            setAssignments(assignments.filter(a => a.id !== assignmentId))
        } catch (error: any) {
            console.error('Error deleting assignment:', error)
            alert('Error al eliminar la asignación: ' + error.message)
        }
    }

    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = searchTerm === '' ||
            assignment.teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subject.code.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesSemester = semesterFilter === 'all' || assignment.semester === semesterFilter

        return matchesSearch && matchesSemester
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#53ad35]/20 border-t-[#53ad35] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando asignaciones...</p>
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
                        <FaLink className="text-[#53ad35]" />
                        <span>Asignación de Maestros a Materias</span>
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Gestiona qué maestros imparten cada materia por semestre y grupo
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="mt-4 sm:mt-0 bg-[#53ad35] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#34a32a] transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                    <FaPlus />
                    <span>Nueva Asignación</span>
                </button>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Asignaciones</p>
                            <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <FaLink className="text-white text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Maestros Asignados</p>
                            <p className="text-3xl font-bold text-green-600">
                                {new Set(assignments.map(a => a.teacher_id)).size}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <FaChalkboardTeacher className="text-white text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Materias Cubiertas</p>
                            <p className="text-3xl font-bold text-purple-600">
                                {new Set(assignments.map(a => a.subject_id)).size}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <FaBook className="text-white text-xl" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por maestro o materia..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
                            value={semesterFilter}
                            onChange={(e) => setSemesterFilter(e.target.value)}
                        >
                            <option value="all">Todos los semestres</option>
                            {Array.from(new Set(assignments.map(a => a.semester))).map(semester => (
                                <option key={semester} value={semester}>{semester}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Create Form Modal */}
            {showCreateForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowCreateForm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Nueva Asignación</h3>
                        <form onSubmit={handleCreateAssignment} className="space-y-4">
                            {/* Maestro */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaChalkboardTeacher className="inline mr-2 text-[#53ad35]" />
                                    Maestro
                                </label>
                                <select
                                    value={newAssignment.teacher_id}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, teacher_id: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar maestro...</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.first_name} {teacher.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Materia */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBook className="inline mr-2 text-[#53ad35]" />
                                    Materia
                                </label>
                                <select
                                    value={newAssignment.subject_id}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, subject_id: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar materia...</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.code} - {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Semestre (sin grupo) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendarAlt className="inline mr-2 text-[#53ad35]" />
                                    Semestre
                                </label>
                                <select
                                    value={newAssignment.semester}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, semester: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#53ad35] focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar semestre...</option>
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map(semester => (
                                        <option key={semester} value={semester.toString()}>
                                            {semester}° Semestre
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Botones */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#53ad35] text-white px-6 py-2 rounded-lg hover:bg-[#34a32a] transition-colors"
                                >
                                    Crear Asignación
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Assignments Table */}
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
                                    Materia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semestre
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAssignments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <FaLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-gray-500 text-lg font-medium">
                                            {searchTerm || semesterFilter !== 'all'
                                                ? 'No se encontraron asignaciones con los filtros aplicados'
                                                : 'No hay asignaciones registradas'
                                            }
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAssignments.map((assignment) => (
                                    <tr key={assignment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-[#53ad35] flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {assignment.teacher.first_name.charAt(0)}{assignment.teacher.last_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {assignment.teacher.first_name} {assignment.teacher.last_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {assignment.teacher.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {assignment.subject.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {assignment.subject.code} • {assignment.subject.credits} créditos
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-900">{assignment.semester}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDeleteAssignment(assignment.id)}
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Eliminar asignación"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}