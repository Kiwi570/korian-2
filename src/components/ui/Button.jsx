import { forwardRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/25',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25',
  'outline-white': 'bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur',
  'outline-gold': 'bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500/10',
}

const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  className,
  onClick,
  ...props 
}, ref) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    
    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    
    if (onClick) onClick(e)
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 overflow-hidden',
        'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
          }}
        />
      ))}
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export function IconButton({ 
  icon: Icon, 
  size = 'md', 
  tooltip,
  className,
  ...props 
}) {
  const iconSizes = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }
  
  const iconScale = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl transition-all duration-200',
        'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
        'hover:bg-slate-100 dark:hover:bg-dark-700',
        'active:scale-95',
        iconSizes[size],
        className
      )}
      title={tooltip}
      {...props}
    >
      <Icon className={iconScale[size]} />
    </button>
  )
}
