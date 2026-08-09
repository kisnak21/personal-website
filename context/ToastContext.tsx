'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => number
  removeToast: (id: number) => void
  success: (message: string) => number
  error: (message: string) => number
  warning: (message: string) => number
  info: (message: string) => number
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const toastsRef = useRef<ToastItem[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => {
      const next = prev.filter(t => t.id !== id)
      toastsRef.current = next
      return next
    })
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
    const id = Date.now()
    setToasts(prev => {
      const next = [...prev, { id, message, type }]
      toastsRef.current = next
      return next
    })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [removeToast])

  const success = useCallback((message: string) => addToast(message, 'success'), [addToast])
  const errorFn = useCallback((message: string) => addToast(message, 'error'), [addToast])
  const warning = useCallback((message: string) => addToast(message, 'warning'), [addToast])
  const info = useCallback((message: string) => addToast(message, 'info'), [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error: errorFn, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, removeToast }: { toasts: ToastItem[], removeToast: (id: number) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2 max-w-md">
      {toasts.map(toast => (
        <ToastItemCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function ToastItemCard({ toast, onClose }: { toast: ToastItem, onClose: () => void }) {
  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <XCircle size={20} className="text-red-500" />,
    warning: <AlertCircle size={20} className="text-yellow-500" />,
    info: <AlertCircle size={20} className="text-blue-500" />,
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${bgColors[toast.type]} shadow-lg animate-slide-in`}>
      {icons[toast.type]}
      <p className="text-sm font-medium text-on-surface flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-surface-variant rounded smooth-transition"
      >
        <X size={16} className="text-on-surface-variant" />
      </button>
    </div>
  )
}
