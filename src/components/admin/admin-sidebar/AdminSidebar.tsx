'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaChartBar,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaPlus,
  FaListAlt,
  FaLink
} from 'react-icons/fa'
import { IoSchool } from 'react-icons/io5'

interface MenuItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  subItems?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: FaTachometerAlt,
  },
  {
    name: 'Maestros',
    href: '/admin/teachers',
    icon: FaChalkboardTeacher,
    subItems: [
      {
        name: 'Lista de Maestros',
        href: '/admin/teachers',
        icon: FaListAlt,
      },
      {
        name: 'Agregar Maestro',
        href: '/admin/teachers/create',
        icon: FaPlus,
      },
      {
        name: 'Asignar a Materias',
        href: '/admin/teachers/assignments',
        icon: FaLink,
      }
    ]
  },
  {
    name: 'Materias',
    href: '/admin/subjects',
    icon: FaBook,
  },
  {
    name: 'Carreras',
    href: '/admin/careers',
    icon: FaGraduationCap,
  },
  {
    name: 'Usuarios',
    href: '/admin/users',
    icon: FaUsers,
  },
  {
    name: 'Reportes',
    href: '/admin/reports',
    icon: FaChartBar,
  },
  {
    name: 'Configuración',
    href: '/admin/settings',
    icon: FaCog,
  }
]

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string, isSubItem: boolean = false) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    
    if (isSubItem) {
      return pathname === href
    }
    
   return pathname.startsWith(href) && (
      pathname === href || 
      pathname.charAt(href.length) === '/' ||
      pathname.length === href.length
    )
  }

  return (
    <motion.div
      className={`bg-white shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#53ad35] to-[#34a32a] rounded-xl flex items-center justify-center">
                  <IoSchool className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">FIME-NET</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight className="text-gray-600" />
            ) : (
              <FaChevronLeft className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <div key={item.name}>
              {/* Main Menu Item */}
              <div
                className={`relative group ${
                  item.subItems ? 'cursor-pointer' : ''
                }`}
              >
                {item.subItems ? (
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-[#53ad35] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="flex-shrink-0 w-5 h-5" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="ml-3 flex items-center justify-between flex-1"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{ 
                              rotate: expandedItems.includes(item.name) ? 90 : 0 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaChevronRight className="w-3 h-3" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-[#53ad35] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="flex-shrink-0 w-5 h-5" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="ml-3 flex items-center justify-between flex-1"
                        >
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                )}
              </div>

              {/* Sub Menu Items */}
              <AnimatePresence>
                {item.subItems && expandedItems.includes(item.name) && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive(subItem.href, true)
                            ? 'bg-[#53ad35]/10 text-[#53ad35] border-l-2 border-[#53ad35]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <subItem.icon className="flex-shrink-0 w-4 h-4" />
                        <span className="ml-3">{subItem.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-500 text-center"
            >
              FIME-NET Admin Panel
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}