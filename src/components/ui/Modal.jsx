import { useEffect } from 'react'
import { X, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showClose = true,
  className 
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={cn('modal-content w-full', sizes[size], className)}
        onClick={e => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-dark-700">
            {title && (
              <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirmation',
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'default',
  loading = false,
}) {
  const variants = {
    default: { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    danger: { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  }
  
  const { icon: Icon, color, bg } = variants[variant]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className={cn('w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center', bg)}>
          <Icon className={cn('w-8 h-8', color)} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        {message && <p className="text-slate-500 dark:text-slate-400 mb-6">{message}</p>}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">{cancelText}</Button>
          <Button 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            onClick={onConfirm} 
            loading={loading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = 'Succès !',
  message,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center animate-scale-bounce">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        {message && <p className="text-slate-500 dark:text-slate-400 mb-6">{message}</p>}
        <Button onClick={onClose} className="w-full">Parfait !</Button>
      </div>
    </Modal>
  )
}

export function AlertModal({ 
  isOpen, 
  onClose, 
  title,
  message,
  variant = 'warning',
}) {
  const variants = {
    warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    error: { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  }
  
  const { icon: Icon, color, bg } = variants[variant]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className={cn('w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center animate-shake', bg)}>
          <Icon className={cn('w-8 h-8', color)} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        {message && <p className="text-slate-500 dark:text-slate-400 mb-6">{message}</p>}
        <Button onClick={onClose} className="w-full">Compris</Button>
      </div>
    </Modal>
  )
}
