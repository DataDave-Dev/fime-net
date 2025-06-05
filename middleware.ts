import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('🔥 Middleware ejecutándose para:', request.nextUrl.pathname)
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { pathname } = request.nextUrl

  // Solo verificar rutas de admin
  if (!pathname.startsWith('/admin')) {
    await supabase.auth.getUser()
    return response
  }

  // SOLO verificar autenticación básica
  const { data: { user } } = await supabase.auth.getUser()
  
  console.log('👤 Usuario:', user?.email || 'No autenticado')

  // Si no hay usuario, redirigir a login
  if (!user) {
    console.log('🚫 No hay usuario, redirigiendo a login...')
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  console.log('✅ Usuario autenticado, verificación de rol en cliente')
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}