import { Link } from 'react-router-dom'
import { Clock, Calendar, TrendingUp, Briefcase, ArrowRight, CheckCircle, FileText, Bell, Trophy, Flame, Sparkles, Zap } from 'lucide-react'
import { Card, StatCard, Button, Badge, Avatar, ProgressBar, XPBar, AnimatedCounter } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { getGreeting, formatDate } from '@/lib/utils'
import { IMAGES } from '@/lib/images'
import { TIMESHEET_STATUS_CONFIG, getLevelFromXP, getXPProgress, getXPToNextLevel } from '@/lib/constants'

export default function ConsultantDashboard() {
  const { user, mission, timesheet, timesheetStats, leaveBalance, gamification, notifications, achievementPopup } = useApp()
  const greeting = getGreeting()
  const level = getLevelFromXP(gamification.xp)
  const xpProgress = getXPProgress(gamification.xp)
  const xpToNext = getXPToNextLevel(gamification.xp)

  return (
    <div className="space-y-8">
      {/* Achievement Popup */}
      {achievementPopup && (
        <div className="achievement-popup flex items-center gap-4">
          <span className="text-4xl">{achievementPopup.type === 'badge' ? achievementPopup.badge.icon : achievementPopup.level.icon}</span>
          <div>
            <p className="text-sm text-white/80">
              {achievementPopup.type === 'badge' ? 'Badge débloqué !' : 'Niveau supérieur !'}
            </p>
            <p className="font-bold text-lg">
              {achievementPopup.type === 'badge' ? achievementPopup.badge.name : achievementPopup.level.name}
            </p>
          </div>
        </div>
      )}

      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-fade-in">
        <div className="absolute inset-0">
          <img src={IMAGES.profileCover} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent" />
        </div>
        
        <div className="absolute top-4 right-4 w-32 h-32 bg-gold-500/20 rounded-full blur-[60px] animate-pulse-glow" />
        <div className="absolute bottom-4 left-1/2 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px]" />
        
        <div className="relative p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <Avatar src={user?.avatar} name={user?.fullName} size="xl" status="online" />
            {gamification.streak >= 3 && (
              <div className="absolute -top-2 -right-2 flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-bold shadow-lg shadow-orange-500/50">
                <Flame className="w-4 h-4 animate-flame" />
                <span>{gamification.streak}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-gold-400 text-sm font-semibold mb-1 flex items-center gap-2">
              {greeting.emoji} {greeting.text}
              <Sparkles className="w-4 h-4 animate-sparkle" />
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              {user?.firstName} !
            </h1>
            <p className="text-slate-300">Prêt à démarrer une nouvelle journée productive ?</p>
            
            {/* Level & XP */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl border border-white/10">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{level.name}</p>
                  <p className="text-xs text-slate-400">Niveau {level.level}</p>
                </div>
              </div>
              <div className="flex-1 max-w-[200px]">
                <XPBar current={xpProgress} max={100} />
                <p className="text-xs text-slate-400 mt-1">{gamification.xp} XP • {xpToNext > 0 ? `${xpToNext} XP pour le suivant` : 'Max !'}</p>
              </div>
            </div>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-5 min-w-[220px] hover:bg-white/15 transition-colors">
            <p className="text-xs text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Mission actuelle
            </p>
            <p className="font-bold text-lg">{mission?.clientName}</p>
            <p className="text-sm text-slate-300">{mission?.location}</p>
          </Card>
        </div>
      </div>

      {/* Action Required Banner */}
      {timesheetStats.progress < 100 && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border-amber-200 dark:border-amber-500/30 animate-fade-in-up hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-7 h-7 text-amber-600 dark:text-amber-400 animate-bounce-gentle" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Action requise
                <Badge variant="warning" size="xs">Urgent</Badge>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Votre timesheet de {formatDate(new Date(), 'MMMM')} n'est pas complet
              </p>
              <ProgressBar value={timesheetStats.progress} max={100} size="sm" color="gold" className="mt-2 max-w-xs" />
            </div>
            <Link to="/consultant/timesheet">
              <Button size="md" className="group">
                Compléter <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          icon={Clock} 
          label="Heures ce mois" 
          value={timesheetStats.totalHours} 
          suffix="h" 
          trend={timesheetStats.overtimeHours > 0 ? `+${timesheetStats.overtimeHours}h sup.` : null}
          trendUp
          color="gold"
        />
        <StatCard 
          icon={Calendar} 
          label="Congés restants" 
          value={leaveBalance.remaining} 
          suffix="j"
          color="blue" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Heures sup." 
          value={timesheetStats.overtimeHours} 
          suffix="h"
          color="purple" 
        />
        <StatCard 
          icon={Briefcase} 
          label="Jours mission" 
          value={timesheetStats.filledDays} 
          suffix={`/${timesheetStats.workingDays}`}
          color="emerald" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Timesheet Progress */}
        <Card hover3D className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Progression Timesheet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(new Date(), 'MMMM yyyy')}</p>
            </div>
            <Badge variant={timesheet.status === 'approved' ? 'success' : timesheet.status === 'submitted' ? 'warning' : 'default'}>
              {TIMESHEET_STATUS_CONFIG[timesheet.status]?.label}
            </Badge>
          </div>
          <div className="space-y-4">
            <ProgressBar 
              value={timesheetStats.filledDays} 
              max={timesheetStats.workingDays} 
              label="Jours remplis" 
              showPercentage
              color="gold"
              glow
            />
            <ProgressBar 
              value={timesheetStats.totalHours} 
              max={timesheetStats.expectedHours} 
              label="Heures totales" 
              showPercentage
              color="emerald" 
            />
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-dark-700">
            <Link to="/consultant/timesheet">
              <Button variant="secondary" className="w-full group">
                Voir le timesheet 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card hover3D className="animate-fade-in-up animation-delay-100">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Actions rapides</h3>
          <div className="grid gap-3">
            <QuickAction 
              to="/consultant/timesheet"
              icon={Clock}
              iconBg="bg-gold-100 dark:bg-gold-500/20"
              iconColor="text-gold-600 dark:text-gold-400"
              title="Saisir mes heures"
              subtitle="Timesheet du mois en cours"
            />
            <QuickAction 
              to="/consultant/leave"
              icon={Calendar}
              iconBg="bg-indigo-100 dark:bg-indigo-500/20"
              iconColor="text-indigo-600 dark:text-indigo-400"
              title="Demander un congé"
              subtitle={`${leaveBalance.remaining} jours disponibles`}
            />
            <QuickAction 
              to="/consultant/documents"
              icon={FileText}
              iconBg="bg-emerald-100 dark:bg-emerald-500/20"
              iconColor="text-emerald-600 dark:text-emerald-400"
              title="Mes documents"
              subtitle="Fiches de paie, contrats"
            />
            <QuickAction 
              to="/consultant/achievements"
              icon={Trophy}
              iconBg="bg-amber-100 dark:bg-amber-500/20"
              iconColor="text-amber-600 dark:text-amber-400"
              title="Mes succès"
              subtitle={`${gamification.unlockedBadges.length} badges débloqués`}
              badge={gamification.unlockedBadges.length > 0 ? '🏆' : null}
            />
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="animate-fade-in-up animation-delay-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activité récente</h3>
          <Badge variant="info" size="sm">{notifications.filter(n => !n.read).length} nouvelles</Badge>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notif, i) => (
            <div 
              key={notif.id} 
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-700 transition-colors cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notif.type === 'timesheet' ? 'bg-emerald-50 dark:bg-emerald-500/10' :
                notif.type === 'document' ? 'bg-blue-50 dark:bg-blue-500/10' :
                'bg-amber-50 dark:bg-amber-500/10'
              }`}>
                {notif.type === 'timesheet' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> :
                 notif.type === 'document' ? <FileText className="w-5 h-5 text-blue-500" /> :
                 <Trophy className="w-5 h-5 text-amber-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{notif.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(notif.date, 'dd MMM HH:mm')}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function QuickAction({ to, icon: Icon, iconBg, iconColor, title, subtitle, badge }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-700 hover:bg-slate-100 dark:hover:bg-dark-600 transition-all group hover:scale-[1.02] hover:shadow-md"
    >
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          {title}
          {badge && <span className="text-lg">{badge}</span>}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-gold-500 transition-all" />
    </Link>
  )
}
