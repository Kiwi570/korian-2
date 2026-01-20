import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Clock, Calendar, FileText, User, Settings, 
  HelpCircle, LogOut, ChevronRight, X, CheckSquare, Users, 
  BarChart3, Trophy, Flame, Sparkles, ExternalLink, Briefcase, UserCog
} from 'lucide-react'
import { Avatar, Badge, Tooltip, XPBar } from '@/components/ui'
import { cn } from '@/lib/utils'
import { NAV_ITEMS_CONSULTANT, NAV_ITEMS_MANAGER, ROLES, APP_VERSION, getLevelFromXP, getXPProgress, getXPToNextLevel } from '@/lib/constants'
import { useApp } from '@/context/AppContext'

const iconMap = { LayoutDashboard, Clock, Calendar, FileText, User, Settings, HelpCircle, CheckSquare, Users, BarChart3, Trophy }

export function Sidebar({ isMobileOpen, onMobileClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, gamification, logout, switchRole } = useApp()
  
  const isManager = user?.role === ROLES.MANAGER
  const navItems = isManager ? NAV_ITEMS_MANAGER : NAV_ITEMS_CONSULTANT
  const basePath = isManager ? '/manager' : '/consultant'
  
  const level = getLevelFromXP(gamification.xp)
  const xpProgress = getXPProgress(gamification.xp)
  const xpToNext = getXPToNextLevel(gamification.xp)

  const handleSwitchRole = (role) => {
    switchRole(role)
    navigate(role === ROLES.MANAGER ? '/manager' : '/consultant')
    onMobileClose?.()
  }

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={onMobileClose} />
      )}
      
      <aside className={cn(
        'fixed left-0 top-0 bottom-0 w-[280px] z-50',
        'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col',
        'transition-transform duration-300 ease-out lg:translate-x-0',
        'border-r border-slate-800/50',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button onClick={onMobileClose} className="lg:hidden absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/30 animate-glow-pulse">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-xl tracking-tight">LUX-AS</h1>
              <div className="flex items-center gap-2">
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Portal</p>
                <Badge variant="solid-gold" size="xs">v{APP_VERSION}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="px-4 pt-4">
          <div className="bg-slate-800/50 rounded-2xl p-1.5 flex gap-1">
            <button
              onClick={() => handleSwitchRole(ROLES.CONSULTANT)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                !isManager 
                  ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-white shadow-lg shadow-gold-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <Briefcase className="w-4 h-4" />
              <span>Consultant</span>
            </button>
            <button
              onClick={() => handleSwitchRole(ROLES.MANAGER)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                isManager 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <UserCog className="w-4 h-4" />
              <span>Manager</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-dark">
          <p className="px-4 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu principal</p>
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path) && item.path !== basePath
              const finalActive = item.exact ? location.pathname === item.path : isActive || (item.path === basePath && location.pathname === item.path)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    finalActive 
                      ? 'nav-item-active' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  )}
                >
                  <Icon className={cn('w-5 h-5 transition-all', finalActive ? 'text-gold-400' : 'group-hover:scale-110')} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <Badge variant="error" size="xs" pulse>2</Badge>}
                  {finalActive && <ChevronRight className="w-4 h-4 text-gold-500" />}
                </NavLink>
              )
            })}
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <p className="px-4 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Support</p>
            <div className="space-y-1">
              <NavLink 
                to={`${basePath}/settings`} 
                onClick={onMobileClose} 
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all', 
                  isActive ? 'nav-item-active' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                <Settings className="w-5 h-5" />
                <span>Paramètres</span>
              </NavLink>
              <a href="mailto:support@lux-as.com" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <HelpCircle className="w-5 h-5" />
                <span>Aide & Support</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </a>
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="mt-6 p-4 bg-gradient-to-br from-gold-500/20 via-amber-500/10 to-transparent rounded-2xl border border-gold-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{level.name}</p>
                  <p className="text-xs text-slate-400">Niveau {level.level}</p>
                </div>
              </div>
              {gamification.streak > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-400 animate-flame" />
                  <span className="text-sm font-bold text-orange-400">{gamification.streak}</span>
                </div>
              )}
            </div>
            <XPBar current={xpProgress} max={100} />
            <p className="text-xs text-slate-400 mt-2">
              {gamification.xp} XP • {xpToNext > 0 ? `${xpToNext} XP pour niveau suivant` : 'Niveau max !'}
            </p>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-800/50">
          <NavLink 
            to={`${basePath}/profile`} 
            onClick={onMobileClose} 
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <Avatar src={user?.avatar} name={user?.fullName} size="md" status="online" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.fullName || 'Utilisateur'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.title || user?.role}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </NavLink>
          
          <Tooltip content="Se déconnecter" position="right">
            <button 
              onClick={logout}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Déconnexion</span>
            </button>
          </Tooltip>
        </div>
      </aside>
    </>
  )
}
