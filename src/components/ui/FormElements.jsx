import { cn, getInitials, getAvatarColor } from '@/lib/utils'

// ========== BADGE ==========
const badgeVariants = {
  default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30',
  gold: 'badge-gold',
  success: 'badge-success',
  warning: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
  error: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30',
  info: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  'solid-gold': 'bg-gradient-to-r from-gold-500 to-amber-500 text-white border-transparent shadow-lg shadow-gold-500/30',
  'solid-success': 'bg-emerald-500 text-white border-transparent',
}

const badgeSizes = {
  xs: 'px-2 py-0.5 text-[10px]',
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
}

export function Badge({ children, variant = 'default', size = 'sm', pulse = false, className }) {
  return (
    <span className={cn(
      'badge border',
      badgeVariants[variant],
      badgeSizes[size],
      pulse && 'animate-pulse',
      className
    )}>
      {children}
    </span>
  )
}

// ========== AVATAR ==========
const avatarSizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-24 h-24 text-2xl',
}

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-500',
  busy: 'bg-rose-500',
}

export function Avatar({ src, name, size = 'md', status, className }) {
  const initials = getInitials(name)
  const bgColor = getAvatarColor(name)
  
  return (
    <div className={cn('relative inline-flex', status && 'avatar-ring-online')}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover ring-2 ring-white dark:ring-dark-800',
            avatarSizes[size],
            className
          )}
        />
      ) : (
        <div className={cn(
          'rounded-full flex items-center justify-center font-bold text-white ring-2 ring-white dark:ring-dark-800',
          bgColor,
          avatarSizes[size],
          className
        )}>
          {initials}
        </div>
      )}
      {status && (
        <>
          <span className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-dark-800',
            statusColors[status],
            size === 'xs' || size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
          )} />
          {status === 'online' && (
            <span className={cn(
              'absolute -bottom-0.5 -right-0.5 rounded-full',
              statusColors[status],
              size === 'xs' || size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5',
              'animate-ping opacity-75'
            )} />
          )}
        </>
      )}
    </div>
  )
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }) {
  const shown = avatars.slice(0, max)
  const remaining = avatars.length - max
  
  return (
    <div className="flex -space-x-2">
      {shown.map((avatar, i) => (
        <Avatar key={i} {...avatar} size={size} className="ring-2 ring-white dark:ring-dark-800" />
      ))}
      {remaining > 0 && (
        <div className={cn(
          'rounded-full bg-slate-200 dark:bg-dark-600 flex items-center justify-center font-semibold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-dark-800',
          avatarSizes[size]
        )}>
          +{remaining}
        </div>
      )}
    </div>
  )
}

// ========== INPUT ==========
export function Input({ label, error, hint, icon: Icon, className, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        )}
        <input
          className={cn(
            'input',
            Icon && 'pl-12',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-100',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-rose-500">{error}</p>}
      {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  )
}

// ========== TEXTAREA ==========
export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'input resize-none',
          error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-100',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  )
}

// ========== SELECT ==========
export function Select({ label, options = [], className, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select className={cn('input cursor-pointer', className)} {...props}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// ========== CHECKBOX ==========
export function Checkbox({ label, checked, onChange, className }) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer group', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-dark-600 peer-checked:border-gold-500 peer-checked:bg-gold-500 transition-all duration-200 group-hover:border-gold-400">
          <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  )
}

// ========== TOGGLE ==========
export function Toggle({ label, description, checked, onChange, className }) {
  return (
    <label className={cn('flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-700 transition-colors', className)}>
      <div>
        {label && <p className="font-medium text-slate-900 dark:text-white">{label}</p>}
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-12 h-7 bg-slate-300 dark:bg-dark-600 rounded-full peer-checked:bg-gold-500 transition-colors duration-300">
          <div className={cn(
            'absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300',
            checked && 'translate-x-5'
          )} />
        </div>
      </div>
    </label>
  )
}
