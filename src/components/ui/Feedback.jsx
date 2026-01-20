import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X, Search, Inbox } from 'lucide-react'
import { cn, generateId, animateValue } from '@/lib/utils'

// ========== TOAST SYSTEM ==========
const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = generateId()
    setToasts(prev => [...prev, { ...toast, id }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 4000)
    
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-3 pointer-events-none">
        {toasts.map((t, i) => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} index={i} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

const toastConfig = {
  success: { icon: CheckCircle, color: 'text-emerald-500', border: 'border-l-emerald-500' },
  error: { icon: XCircle, color: 'text-rose-500', border: 'border-l-rose-500' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', border: 'border-l-amber-500' },
  info: { icon: Info, color: 'text-blue-500', border: 'border-l-blue-500' },
}

function Toast({ type, title, message, onClose, index }) {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div 
      className={cn(
        'toast border-l-4 pointer-events-auto min-w-[320px]',
        config.border
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', `${config.color} bg-current/10`)}>
        <Icon className={cn('w-5 h-5', config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        {message && <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{message}</p>}
      </div>
      <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// ========== PROGRESS BAR ==========
const progressColors = {
  gold: 'bg-gradient-to-r from-gold-400 via-amber-500 to-gold-500',
  emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
  blue: 'bg-gradient-to-r from-blue-400 to-blue-500',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-500',
  rose: 'bg-gradient-to-r from-rose-400 to-rose-500',
}

const progressSizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
  xl: 'h-5',
}

export function ProgressBar({ 
  value, 
  max = 100, 
  size = 'md', 
  color = 'gold', 
  label,
  showPercentage = false,
  animate = true,
  glow = false,
  className 
}) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  
  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm mb-2">
          {label && <span className="text-slate-600 dark:text-slate-400">{label}</span>}
          {showPercentage && <span className="font-semibold text-slate-900 dark:text-white">{percentage}%</span>}
        </div>
      )}
      <div className={cn('progress-bar', progressSizes[size])}>
        <div
          className={cn(
            'progress-bar-fill',
            progressColors[color],
            animate && 'animated',
            glow && 'shadow-glow-gold'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// ========== XP BAR (Special) ==========
export function XPBar({ current, max, level, className }) {
  const percentage = Math.min(Math.round((current / max) * 100), 100)
  
  return (
    <div className={className}>
      <div className="xp-bar">
        <div className="xp-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

// ========== ANIMATED COUNTER ==========
export function AnimatedCounter({ value, duration = 1500, suffix = '', className }) {
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    animateValue(0, value, duration, setDisplayValue)
  }, [value, duration])

  return (
    <span className={cn('tabular-nums', className)}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  )
}

// ========== EMPTY STATE ==========
export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-dark-700 flex items-center justify-center">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{description}</p>}
      {action}
    </div>
  )
}

// ========== SKELETON ==========
export function Skeleton({ className }) {
  return (
    <div className={cn(
      'bg-slate-200 dark:bg-dark-700 rounded-lg animate-pulse',
      className
    )} />
  )
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-4', i === lines - 1 && 'w-3/4')} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  )
}

// ========== TOOLTIP ==========
export function Tooltip({ children, content, position = 'top' }) {
  const [visible, setVisible] = useState(false)
  
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && content && (
        <div className={cn(
          'absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg whitespace-nowrap',
          'animate-fade-in-scale',
          positions[position]
        )}>
          {content}
        </div>
      )}
    </div>
  )
}

// ========== TABS HEADER ==========
export function TabsHeader({ tabs, activeTab, onChange, variant = 'pills' }) {
  const variants = {
    pills: {
      container: 'flex gap-2 p-1 bg-slate-100 dark:bg-dark-700 rounded-xl',
      tab: 'px-4 py-2 text-sm font-medium rounded-lg transition-all',
      active: 'bg-white dark:bg-dark-600 text-slate-900 dark:text-white shadow-sm',
      inactive: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
    },
    underline: {
      container: 'flex gap-6 border-b border-slate-200 dark:border-dark-700',
      tab: 'pb-3 text-sm font-medium transition-all relative',
      active: 'text-gold-600 dark:text-gold-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-500',
      inactive: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
    },
  }
  
  const v = variants[variant]

  return (
    <div className={v.container}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(v.tab, activeTab === tab.id ? v.active : v.inactive)}
        >
          {tab.icon && <tab.icon className="w-4 h-4 mr-2 inline" />}
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'ml-2 px-2 py-0.5 text-xs rounded-full',
              activeTab === tab.id ? 'bg-gold-100 text-gold-700 dark:bg-gold-500/20 dark:text-gold-400' : 'bg-slate-200 dark:bg-dark-600'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ========== SEARCH INPUT ==========
export function SearchInput({ value, onChange, placeholder = 'Rechercher...', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-dark-700 border-0 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
      />
    </div>
  )
}
