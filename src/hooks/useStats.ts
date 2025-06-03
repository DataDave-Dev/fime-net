'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Stats } from '@/types/interface'

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    isLoading: true,
    error: null
  })

  const supabase = createClient()

  useEffect(() => {
    fetchStats()
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, isLoading: true, error: null }))

      // Usuarios activos (últimos 30 días)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      // Total de usuarios
      const { data: totalUsersData, error: totalError } = await supabase
        .from('profiles')
        .select('id')

      if (totalError) throw totalError

      // Nuevos usuarios este mes
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { data: newUsersData, error: newError } = await supabase
        .from('profiles')
        .select('id')
        .gte('created_at', startOfMonth.toISOString())

      if (newError) throw newError

      setStats({
        totalUsers: totalUsersData?.length || 0,
        newUsersThisMonth: newUsersData?.length || 0,
        isLoading: false,
        error: null
      })

    } catch (error: any) {
      console.error('Error fetching stats:', error)
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }))
    }
  }

  return { ...stats, refetch: fetchStats }
}