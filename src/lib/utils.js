import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date, formatStr = 'dd MMM yyyy') {
  if (!date) return ''
  return format(new Date(date), formatStr, { locale: fr })
}

export function formatRelative(date) {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })
}

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Bonjour', emoji: '☀️' }
  if (hour < 18) return { text: 'Bon après-midi', emoji: '🌤️' }
  return { text: 'Bonsoir', emoji: '🌙' }
}

export function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getAvatarColor(name) {
  const colors = [
    'bg-rose-500', 'bg-pink-500', 'bg-fuchsia-500', 'bg-purple-500',
    'bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-sky-500',
    'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-green-500',
  ]
  const index = name ? name.charCodeAt(0) % colors.length : 0
  return colors[index]
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function calculateWorkingDays(startDate, endDate, holidays = []) {
  let count = 0
  const current = new Date(startDate)
  const end = new Date(endDate)
  
  while (current <= end) {
    const dayOfWeek = current.getDay()
    const dateStr = format(current, 'yyyy-MM-dd')
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(dateStr)) {
      count++
    }
    current.setDate(current.getDate() + 1)
  }
  return count
}

export function formatNumber(num) {
  return new Intl.NumberFormat('fr-FR').format(num)
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, factor) {
  return start + (end - start) * factor
}

export function animateValue(start, end, duration, callback) {
  const startTime = performance.now()
  
  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(lerp(start, end, easeOut))
    
    callback(current)
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  
  requestAnimationFrame(update)
}

export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export function isWeekend(date) {
  const day = new Date(date).getDay()
  return day === 0 || day === 6
}

export function triggerConfetti(options = {}) {
  import('canvas-confetti').then(confetti => {
    confetti.default({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#d97706', '#fff', '#fef3c7'],
      ...options
    })
  })
}

export function triggerFireworks() {
  import('canvas-confetti').then(confetti => {
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#f59e0b', '#fbbf24', '#d97706']

    ;(function frame() {
      confetti.default({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      })
      confetti.default({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  })
}
