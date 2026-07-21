import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const toastsRef = useRef([])

  const removeToast = useCallback((id) => {
    setToasts(prev => {
      const next = prev.filter(t => t.id !== id)
      toastsRef.current = next
      return next
    })
  }, [])

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
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

  const success = useCallback((message) => addToast(message, 'success'), [addToast])
  const error = useCallback((message) => addToast(message, 'error'), [addToast])
  const warning = useCallback((message) => addToast(message, 'warning'), [addToast])
  const info = useCallback((message) => addToast(message, 'info'), [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

const Toast = ({ toast, onClose }) => {
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