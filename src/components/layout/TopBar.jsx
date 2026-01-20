import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, Bell, Sun, Moon, User, Settings, LogOut, X } from 'lucide-react'
import { Avatar, Badge } from '@/components/ui'
import { cn, formatRelative } from '@/lib/utils'
import { useApp } from '@/context/AppContext'
import { ROLES } from '@/lib/constants'

export function TopBar({ onMenuClick }) {
  const { user, notifications, darkMode, toggleDarkMode, logout } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  
  const basePath = user?.role === ROLES.MANAGER ? '/manager' : '/consultant'
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-dark-700/60">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick} 
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setShowSearch(true)}
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-dark-700 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-600 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Rechercher...</span>
            <kbd className="hidden lg:inline-flex px-2 py-0.5 text-xs bg-white dark:bg-dark-600 rounded border border-slate-200 dark:border-dark-500">⌘K</kbd>
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-all hover:scale-105"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-all hover:scale-105"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-gentle">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-soft-xl border border-slate-200 dark:border-dark-700 z-50 animate-fade-in-scale overflow-hidden">
                  <div className="p-4 border-b border-slate-100 dark:border-dark-700 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && <Badge variant="error" size="xs">{unreadCount} nouvelles</Badge>}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">Aucune notification</p>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div key={notif.id} className={cn(
                          'p-4 hover:bg-slate-50 dark:hover:bg-dark-700 transition-colors cursor-pointer',
                          !notif.read && 'bg-gold-50/50 dark:bg-gold-500/5'
                        )}>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formatRelative(notif.date)}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-100 dark:border-dark-700">
                    <Link 
                      to={`${basePath}/notifications`}
                      onClick={() => setShowNotifications(false)}
                      className="block text-center text-sm text-gold-600 dark:text-gold-400 font-medium hover:underline"
                    >
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
            >
              <Avatar src={user?.avatar} name={user?.fullName} size="sm" status="online" />
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-soft-xl border border-slate-200 dark:border-dark-700 z-50 animate-fade-in-scale overflow-hidden">
                  <div className="p-4 border-b border-slate-100 dark:border-dark-700">
                    <p className="font-semibold text-slate-900 dark:text-white">{user?.fullName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link 
                      to={`${basePath}/profile`}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Mon profil</span>
                    </Link>
                    <Link 
                      to={`${basePath}/settings`}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Paramètres</span>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-dark-700">
                    <button 
                      onClick={() => { logout(); setShowUserMenu(false) }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20" onClick={() => setShowSearch(false)}>
          <div className="w-full max-w-xl bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-dark-700 animate-fade-in-scale" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-dark-700">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                autoFocus
                className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none"
              />
              <button onClick={() => setShowSearch(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Commencez à taper pour rechercher...
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
