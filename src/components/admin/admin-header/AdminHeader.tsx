'use client'

export default function AdminHeader() {

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona maestros, materias y usuarios de FIME-NET
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}