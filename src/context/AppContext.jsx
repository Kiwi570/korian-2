import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import { getFromStorage, setToStorage, removeFromStorage, sleep, triggerConfetti, triggerFireworks } from '@/lib/utils'
import { DEMO_USERS, ROLES, DEMO_MISSION, LUX_HOLIDAYS_DATES, getLevelFromXP } from '@/lib/constants'
import { getAvatarUrl } from '@/lib/images'
import { checkNewBadges, getBadgeById } from '@/lib/achievements'

const AppContext = createContext(null)

const initialGamification = {
  xp: 850,
  streak: 5,
  unlockedBadges: ['first-login', 'first-timesheet', 'streak-7'],
  lastLogin: null,
}

const initialLeaveBalance = {
  annual: 26,
  taken: 8,
  pending: 2,
  remaining: 16,
}

const generateTimesheetEntries = () => {
  const entries = {}
  const now = new Date()
  const start = startOfMonth(now)
  const end = endOfMonth(now)
  const days = eachDayOfInterval({ start, end })
  
  days.forEach(day => {
    const dayOfWeek = getDay(day)
    const dateStr = format(day, 'yyyy-MM-dd')
    const isPast = day < now
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isHoliday = LUX_HOLIDAYS_DATES.includes(dateStr)
    
    if (!isWeekend && !isHoliday && isPast && Math.random() > 0.2) {
      entries[dateStr] = {
        hours: 8,
        overtime: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0
      }
    }
  })
  
  return entries
}

const calculateTimesheetStats = (entries) => {
  const now = new Date()
  const start = startOfMonth(now)
  const end = endOfMonth(now)
  const days = eachDayOfInterval({ start, end })
  
  let workingDays = 0
  let filledDays = 0
  let totalHours = 0
  let overtimeHours = 0
  
  days.forEach(day => {
    const dayOfWeek = getDay(day)
    const dateStr = format(day, 'yyyy-MM-dd')
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isHoliday = LUX_HOLIDAYS_DATES.includes(dateStr)
    
    if (!isWeekend && !isHoliday) {
      workingDays++
      const entry = entries[dateStr]
      if (entry?.hours > 0) {
        filledDays++
        totalHours += entry.hours
        overtimeHours += entry.overtime || 0
      }
    }
  })
  
  return {
    workingDays,
    filledDays,
    totalHours,
    overtimeHours,
    expectedHours: workingDays * 8,
    progress: workingDays > 0 ? Math.round((filledDays / workingDays) * 100) : 0,
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [gamification, setGamification] = useState(initialGamification)
  const [leaveBalance, setLeaveBalance] = useState(initialLeaveBalance)
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'timesheet', title: 'Timesheet approuvé', date: new Date(Date.now() - 86400000).toISOString(), read: false },
    { id: '2', type: 'document', title: 'Nouvelle fiche de paie', date: new Date(Date.now() - 172800000).toISOString(), read: false },
    { id: '3', type: 'achievement', title: 'Badge débloqué !', date: new Date(Date.now() - 259200000).toISOString(), read: true },
  ])
  const [mission] = useState(DEMO_MISSION)
  const [timesheet, setTimesheet] = useState(() => ({
    status: 'draft',
    entries: generateTimesheetEntries(),
    remarks: '',
  }))
  const [pendingApprovals] = useState({
    timesheets: [
      { id: 'ts-1', consultantId: 'team-1', consultantName: 'Marie Dupont', month: 'Janvier 2025', hours: 168, overtime: 4 },
      { id: 'ts-2', consultantId: 'team-4', consultantName: 'Pierre Durand', month: 'Janvier 2025', hours: 160, overtime: 8 },
    ],
    leaves: [
      { id: 'lv-1', consultantId: 'team-2', consultantName: 'Thomas Weber', type: 'annual', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, reason: 'Vacances ski' },
    ],
  })
  const [achievementPopup, setAchievementPopup] = useState(null)

  const timesheetStats = calculateTimesheetStats(timesheet.entries)

  // Load from storage
  useEffect(() => {
    const savedUser = getFromStorage('luxas_user')
    const savedDarkMode = getFromStorage('luxas_darkMode', false)
    const savedGamification = getFromStorage('luxas_gamification')
    
    if (savedUser) {
      setUser({ ...savedUser, avatar: getAvatarUrl(savedUser.fullName) })
      setIsAuthenticated(true)
    }
    
    setDarkMode(savedDarkMode)
    if (savedDarkMode) document.documentElement.classList.add('dark')
    
    if (savedGamification) setGamification(savedGamification)
  }, [])

  // Login
  const login = useCallback(async (email, password) => {
    await sleep(800)
    
    const demoUser = Object.values(DEMO_USERS).find(u => u.email === email && u.password === password)
    
    if (demoUser) {
      const userWithAvatar = { ...demoUser, avatar: getAvatarUrl(demoUser.fullName) }
      setUser(userWithAvatar)
      setIsAuthenticated(true)
      setToStorage('luxas_user', demoUser)
      
      // Check streak
      const today = format(new Date(), 'yyyy-MM-dd')
      const lastLogin = gamification.lastLogin
      
      if (lastLogin !== today) {
        const newStreak = lastLogin === format(new Date(Date.now() - 86400000), 'yyyy-MM-dd') 
          ? gamification.streak + 1 
          : 1
        
        setGamification(prev => {
          const updated = { ...prev, streak: newStreak, lastLogin: today }
          setToStorage('luxas_gamification', updated)
          return updated
        })
      }
      
      return { success: true, role: demoUser.role }
    }
    
    return { success: false, error: 'Email ou mot de passe incorrect' }
  }, [gamification])

  // Logout
  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    removeFromStorage('luxas_user')
    window.location.href = '/login'
  }, [])

  // Switch role (Consultant <-> Manager) - Charge l'utilisateur complet du rôle
  const switchRole = useCallback((newRole) => {
    if (!user) return
    const targetUser = newRole === ROLES.MANAGER ? DEMO_USERS.manager : DEMO_USERS.consultant
    const userWithAvatar = { ...targetUser, avatar: getAvatarUrl(targetUser.fullName) }
    setUser(userWithAvatar)
    setToStorage('luxas_user', targetUser)
  }, [user])

  // Dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev
      setToStorage('luxas_darkMode', newValue)
      document.documentElement.classList.toggle('dark', newValue)
      return newValue
    })
  }, [])

  // XP
  const addXP = useCallback((amount, reason) => {
    setGamification(prev => {
      const newXP = prev.xp + amount
      const oldLevel = getLevelFromXP(prev.xp)
      const newLevel = getLevelFromXP(newXP)
      
      if (newLevel.level > oldLevel.level) {
        triggerFireworks()
        setAchievementPopup({ type: 'level', level: newLevel })
        setTimeout(() => setAchievementPopup(null), 4000)
      }
      
      const updated = { ...prev, xp: newXP }
      setToStorage('luxas_gamification', updated)
      return updated
    })
  }, [])

  // Unlock badge
  const unlockBadge = useCallback((badgeId) => {
    setGamification(prev => {
      if (prev.unlockedBadges.includes(badgeId)) return prev
      
      const badge = getBadgeById(badgeId)
      if (badge) {
        triggerConfetti()
        setAchievementPopup({ type: 'badge', badge })
        setTimeout(() => setAchievementPopup(null), 4000)
      }
      
      const updated = {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
        xp: prev.xp + (badge?.xp || 0)
      }
      setToStorage('luxas_gamification', updated)
      return updated
    })
  }, [])

  // Mark notification as read
  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  // Timesheet
  const updateTimesheetEntry = useCallback((dateStr, data) => {
    setTimesheet(prev => ({
      ...prev,
      entries: { ...prev.entries, [dateStr]: data }
    }))
    addXP(10, 'Jour rempli')
  }, [addXP])

  const updateTimesheetRemarks = useCallback((remarks) => {
    setTimesheet(prev => ({ ...prev, remarks }))
  }, [])

  const saveTimesheet = useCallback(async () => {
    await sleep(500)
    return true
  }, [])

  const submitTimesheet = useCallback(async () => {
    await sleep(800)
    setTimesheet(prev => ({ ...prev, status: 'submitted' }))
    addXP(50, 'Timesheet soumis')
    triggerConfetti()
    return true
  }, [addXP])

  const value = {
    user,
    isAuthenticated,
    darkMode,
    toggleDarkMode,
    gamification,
    leaveBalance,
    notifications,
    mission,
    timesheet,
    timesheetStats,
    pendingApprovals,
    achievementPopup,
    login,
    logout,
    switchRole,
    addXP,
    unlockBadge,
    markNotificationRead,
    updateTimesheetEntry,
    updateTimesheetRemarks,
    saveTimesheet,
    submitTimesheet,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
