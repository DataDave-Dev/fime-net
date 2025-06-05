import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { WebFont } from '@/config/fonts'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    console.log('🔍 Verificando acceso a admin...')

    const { data: { user }, error } = await supabase.auth.getUser()

    console.log('👤 Usuario:', user ? user.email : 'No autenticado')

    if (!user) {
        console.log('🚫 No autenticado, redirigiendo a login...')
        redirect('/auth/login?redirectTo=/admin')
    }

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
        <main className={`${WebFont} antialiased`}>
            {children}
        </main>
    )
}