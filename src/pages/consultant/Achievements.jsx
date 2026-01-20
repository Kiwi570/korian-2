import { Trophy, Lock, Flame, Star, Zap } from 'lucide-react'
import { Card, Badge, ProgressBar, XPBar } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/utils'
import { BADGES, BADGE_RARITY } from '@/lib/achievements'
import { getLevelFromXP, getXPProgress, LEVELS, getXPToNextLevel } from '@/lib/constants'

export default function AchievementsPage() {
  const { gamification } = useApp()
  const level = getLevelFromXP(gamification.xp)
  const xpProgress = getXPProgress(gamification.xp)
  const xpToNext = getXPToNextLevel(gamification.xp)

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl animate-bounce-gentle">
            {level.icon}
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-white/80 text-sm mb-1">Niveau {level.level}</p>
            <h1 className="text-3xl font-display font-bold mb-2">{level.name}</h1>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="font-bold">{gamification.xp} XP</span>
              </div>
              {gamification.streak > 0 && (
                <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/30 rounded-full">
                  <Flame className="w-4 h-4 animate-flame" />
                  <span className="font-bold">{gamification.streak} jours</span>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-64">
            <XPBar current={xpProgress} max={100} />
            <p className="text-sm text-white/70 mt-2 text-center">{xpToNext > 0 ? `${xpToNext} XP pour le niveau suivant` : 'Niveau maximum atteint !'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-purple-600">{gamification.unlockedBadges.length}</p>
          <p className="text-sm text-slate-500">Badges débloqués</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-orange-600">{gamification.streak}</p>
          <p className="text-sm text-slate-500">Streak actuel</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-gold-600">{gamification.xp}</p>
          <p className="text-sm text-slate-500">XP total</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-indigo-600">{level.level}</p>
          <p className="text-sm text-slate-500">Niveau actuel</p>
        </Card>
      </div>

      {/* Levels */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Progression des niveaux</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {LEVELS.map(l => {
            const isCurrentLevel = l.level === level.level
            const isUnlocked = gamification.xp >= l.minXP
            return (
              <div key={l.level} className={cn(
                'flex-shrink-0 w-28 p-4 rounded-2xl text-center transition-all',
                isCurrentLevel && 'ring-2 ring-gold-500 bg-gold-50 dark:bg-gold-500/10',
                isUnlocked && !isCurrentLevel && 'bg-slate-100 dark:bg-dark-700',
                !isUnlocked && 'bg-slate-50 dark:bg-dark-800 opacity-50'
              )}>
                <span className="text-3xl mb-2 block">{l.icon}</span>
                <p className={cn('font-bold text-sm', isCurrentLevel ? 'text-gold-600' : 'text-slate-900 dark:text-white')}>{l.name}</p>
                <p className="text-xs text-slate-500">{l.minXP} XP</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Badges ({gamification.unlockedBadges.length}/{BADGES.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = gamification.unlockedBadges.includes(badge.id)
            const rarity = BADGE_RARITY[badge.rarity]
            return (
              <div key={badge.id} className={cn(
                'badge-card',
                isUnlocked ? 'unlocked' : 'locked',
                isUnlocked && badge.rarity === 'legendary' && 'legendary animate-glow-pulse'
              )}>
                <span className={cn('text-4xl mb-2 block', !isUnlocked && 'grayscale opacity-30')}>
                  {isUnlocked ? badge.icon : <Lock className="w-8 h-8 mx-auto text-slate-400" />}
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{badge.name}</p>
                <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
                {isUnlocked && (
                  <Badge className={cn('mt-2', rarity.color)} size="xs">{rarity.label}</Badge>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
