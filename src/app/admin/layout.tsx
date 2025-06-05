import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import AdminSidebar from '@/components/admin/admin-sidebar/AdminSidebar'
import AdminHeader from '@/components/admin/admin-header/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  console.log('🔍 Verificando acceso a admin...')
  
  // Verificar autenticación
  const { data: { user }, error } = await supabase.auth.getUser()
  
  console.log('👤 Usuario:', user ? user.email : 'No autenticado')
  
  if (!user) {
    console.log('🚫 No autenticado, redirigiendo a login...')
    redirect('/auth/login?redirectTo=/admin')
  }

  // Verificar rol de administrador
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  console.log('👥 Perfil:', profile)
  console.log('❌ Error de perfil:', profileError)

  if (!profile || profile.role !== 'admin') {
    console.log('🚫 No es admin, redirigiendo...')
    redirect('/unauthorized')
  }

  console.log('✅ Usuario admin verificado')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AdminHeader user={user} profile={profile} />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}