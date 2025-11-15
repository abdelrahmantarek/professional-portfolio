'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

let toastCount = 0
const listeners: Array<(toast: Toast) => void> = []

export function toast(options: Omit<Toast, 'id'>) {
  const id = `toast-${++toastCount}`
  const toastData: Toast = {
    id,
    duration: 5000,
    type: 'info',
    ...options,
  }
  
  listeners.forEach((listener) => listener(toastData))
  
  return id
}

/**
 * Toast notification container component
 */
export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    const addToast = (toast: Toast) => {
      setToasts((prev) => [...prev, toast])

      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)
      }
    }

    listeners.push(addToast)

    return () => {
      const index = listeners.indexOf(addToast)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [removeToast])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  }

  const iconColors = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
  }

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type || 'info']
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg',
                colors[toast.type || 'info']
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', iconColors[toast.type || 'info'])} />
                
                <div className="flex-1 min-w-0">
                  {toast.title && (
                    <p className="font-semibold text-sm mb-1">
                      {toast.title}
                    </p>
                  )}
                  {toast.description && (
                    <p className="text-sm opacity-90">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

