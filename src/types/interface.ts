export interface Stats {
  totalUsers: number
  newUsersThisMonth: number
  isLoading: boolean
  error: string | null
}

export interface Teachers {
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
  average_rating: number
  total_reviews: number
}

export interface Teacher {
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

export interface Subject {
  id: string
  name: string
  code: string
}

export interface Career {
  id: string
  name: string
  short_name: string
}

export interface TeacherFormData {
  id: string
  first_name: string
  last_name: string
  email: string
  degree: string
  is_active: boolean
}

export interface Subject {
    id: string
    name: string
    code: string
    credits: number
    subject_type: string
    description?: string
    prerequisites?: string[]
    is_active: boolean
    is_laboratory: boolean
    created_at: string
    updated_at: string
}

export interface TeacherSubject {
    id: string
    teacher_id: string
    subject_id: string
    semester: string
    is_active: boolean
    teacher: Teacher
    subject: Subject
}

export interface SubjectFormData {
    name: string
    code: string
    credits: number
    subject_type: string
    description: string
    prerequisites: string[]
    is_laboratory: boolean
}