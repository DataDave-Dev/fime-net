'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          if (error.message === 'Auth session missing!' || 
              error.name === 'AuthSessionMissingError') {
            console.log('No active session - this is normal')
            setUser(null)
            setError(null)
          } else {
            console.error('Auth error:', error.message)
            setError(error.message)
            setUser(null)
          }
        } else {
          console.log('User loaded:', user?.email || 'No user')
          setUser(user)
          setError(null)
        }
      } catch (err: any) {
        if (err.message === 'Auth session missing!' || 
            err.name === 'AuthSessionMissingError') {
          console.log('No active session - this is normal')
          setUser(null)
          setError(null)
        } else {
          console.error('Unexpected auth error:', err)
          setError(err.message || 'Error desconocido')
          setUser(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user')
        
        setUser(session?.user ?? null)
        setError(null)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signOut = async () => {
    try {
      setIsLoading(true)
      console.log('Signing out...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error.message)
        setError(error.message)
        return { error: error.message }
      }
      
      console.log('Sign out successful')
      setUser(null)
      setError(null)
      return { success: true }
    } catch (err: any) {
      console.error('Unexpected sign out error:', err)
      setError(err.message)
      return { error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayName = (user: User) => {
    if (user.user_metadata?.first_name && user.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    return user.email?.split('@')[0] || 'Usuario'
  }

  return {
    user,
    isLoading,
    error,
    signOut,
    getDisplayName
  }
}