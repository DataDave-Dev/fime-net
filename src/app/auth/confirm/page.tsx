import { Suspense } from 'react'
import ConfirmContent from '@/components/auth/confirm-content/ConfirmContent'

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#53ad35]"></div>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  )
}