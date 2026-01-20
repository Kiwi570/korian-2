import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function Card({ 
  children, 
  className, 
  hover = false,
  hover3D = false,
  glass = false,
  gradientBorder = false,
  padding = true,
  ...props 
}) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!hover3D || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleMouseLeave = () => {
    if (!hover3D || !cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        glass ? 'card-glass' : gradientBorder ? 'card-gradient-border' : 'card',
        hover && 'card-hover cursor-pointer',
        hover3D && 'transition-transform duration-200 ease-out',
        !padding && 'p-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('text-lg font-bold text-slate-900 dark:text-white', className)}>{children}</h3>
}

export function CardDescription({ children, className }) {
  return <p className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>{children}</p>
}

export function CardContent({ children, className }) {
  return <div className={cn(className)}>{children}</div>
}

export function CardFooter({ children, className }) {
  return <div className={cn('mt-4 pt-4 border-t border-slate-100 dark:border-dark-700', className)}>{children}</div>
}

const colorVariants = {
  gold: { bg: 'bg-gradient-to-br from-gold-50 to-amber-50 dark:from-gold-500/10 dark:to-amber-500/10', icon: 'bg-gold-100 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400', border: 'border-gold-200 dark:border-gold-500/30' },
  emerald: { bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10', icon: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
  blue: { bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10', icon: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/30' },
  purple: { bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-500/10 dark:to-fuchsia-500/10', icon: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30' },
  rose: { bg: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/10', icon: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-500/30' },
}

export function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  suffix = '', 
  trend, 
  trendUp,
  color = 'gold',
  animate = true,
  className 
}) {
  const colors = colorVariants[color]
  
  return (
    <Card 
      hover3D={animate}
      className={cn(
        'stat-card relative overflow-hidden',
        colors.bg,
        colors.border,
        'border',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('icon-container', colors.icon)}>
          <Icon className="w-7 h-7" />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-lg',
            trendUp ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20' : 'text-rose-600 bg-rose-100 dark:bg-rose-500/20'
          )}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="value text-slate-900 dark:text-white">
          {value}<span className="text-lg text-slate-400">{suffix}</span>
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      </div>
    </Card>
  )
}
