'use client'

import { motion } from 'framer-motion'
import { useStats } from '@/hooks'
import { FaUsers, FaChartLine, FaUserPlus } from 'react-icons/fa'

export default function DynamicStats() {
  const { 
    totalUsers, 
    newUsersThisMonth,
    isLoading, 
    error 
  } = useStats()

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
        Error al cargar estadísticas: {error}
      </div>
    )
  }

  const stats = [
    { 
      number: isLoading ? '---' : `${totalUsers.toLocaleString()}+`, 
      label: 'Total de Estudiantes', 
      sublabel: 'comunidad estudiantil',
      icon: <FaUsers />,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    { 
      number: isLoading ? '--.--%' : '99.9%', 
      label: 'Tiempo de Actividad', 
      sublabel: 'disponibilidad garantizada',
      icon: <FaChartLine />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    { 
      number: isLoading ? '--+' : `${newUsersThisMonth}+`, 
      label: 'Nuevos Este Mes', 
      sublabel: 'crecimiento continuo',
      icon: <FaUserPlus />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
  ]

  return (
    <div className='grid md:grid-cols-3 gap-8'>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className='text-center group'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden'>
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Icon */}
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            
            {/* Number with animation */}
            <motion.div
              className='text-4xl lg:text-5xl font-bold text-white mb-2'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                delay: index * 0.1
              }}
            >
              {stat.number}
            </motion.div>
            
            <div className='text-lg font-semibold text-white mb-1'>
              {stat.label}
            </div>
            <div className='text-sm text-white/70'>
              {stat.sublabel}
            </div>
            
            {/* Real-time indicator for online users */}
            {index === 3 && !isLoading && (
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/60">En vivo</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}