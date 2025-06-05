'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  full_name?: string
  email?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError.message)
        setProfile(null)
        return null
      }

      console.log('Profile loaded:', profileData)
      setProfile(profileData)
      return profileData
    } catch (err: any) {
      console.error('Unexpected profile error:', err)
      setProfile(null)
      return null
    }
  }

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
            setProfile(null)
            setError(null)
          } else {
            console.error('Auth error:', error.message)
            setError(error.message)
            setUser(null)
            setProfile(null)
          }
        } else {
          console.log('User loaded:', user?.email || 'No user')
          setUser(user)
          setError(null)
          
          if (user) {
            await fetchProfile(user.id)
          } else {
            setProfile(null)
          }
        }
      } catch (err: any) {
        if (err.message === 'Auth session missing!' || 
            err.name === 'AuthSessionMissingError') {
          console.log('No active session - this is normal')
          setUser(null)
          setProfile(null)
          setError(null)
        } else {
          console.error('Unexpected auth error:', err)
          setError(err.message || 'Error desconocido')
          setUser(null)
          setProfile(null)
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
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
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
      setProfile(null)
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
    if (profile?.full_name) {
      return profile.full_name
    }
    
    if (user.user_metadata?.first_name && user.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    
    return user.email?.split('@')[0] || 'Usuario'
  }

  const isAdmin = profile?.role === 'admin'
  const isUser = profile?.role === 'user'

  return {
    user,
    profile,
    isLoading,
    error,
    isAdmin,
    isUser,
    signOut,
    getDisplayName,
    fetchProfile
  }
}