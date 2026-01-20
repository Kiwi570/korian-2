export const BADGES = [
  { id: 'first-login', name: 'Bienvenue !', description: 'Première connexion au portail', icon: '👋', xp: 50, rarity: 'common' },
  { id: 'first-timesheet', name: 'Premier pas', description: 'Premier timesheet soumis', icon: '📝', xp: 100, rarity: 'common' },
  { id: 'timesheet-master', name: 'Timesheet Master', description: '10 timesheets soumis à temps', icon: '⏰', xp: 300, rarity: 'rare' },
  { id: 'punctual', name: 'Toujours à l\'heure', description: '5 timesheets avant le 5 du mois', icon: '🎯', xp: 200, rarity: 'rare' },
  { id: 'streak-7', name: 'Semaine parfaite', description: '7 jours de connexion consécutifs', icon: '🔥', xp: 150, rarity: 'common' },
  { id: 'streak-30', name: 'Mois de feu', description: '30 jours de connexion consécutifs', icon: '🌟', xp: 500, rarity: 'epic' },
  { id: 'zero-overtime', name: 'Work-Life Balance', description: 'Un mois sans heures supplémentaires', icon: '⚖️', xp: 150, rarity: 'rare' },
  { id: 'profile-complete', name: 'Profil complet', description: 'Toutes les infos du profil renseignées', icon: '✨', xp: 200, rarity: 'common' },
  { id: 'early-bird', name: 'Lève-tôt', description: 'Connexion avant 7h du matin', icon: '🐦', xp: 100, rarity: 'rare' },
  { id: 'anniversary', name: 'Anniversaire', description: '1 an sur le portail', icon: '🎂', xp: 1000, rarity: 'legendary' },
]

export const BADGE_RARITY = {
  common: { label: 'Commun', color: 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300', glow: null },
  rare: { label: 'Rare', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400', glow: 'shadow-blue-500/30' },
  epic: { label: 'Épique', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400', glow: 'shadow-purple-500/30' },
  legendary: { label: 'Légendaire', color: 'bg-gradient-to-r from-gold-100 to-amber-100 text-gold-700 dark:from-gold-500/20 dark:to-amber-500/20 dark:text-gold-400', glow: 'shadow-gold-500/50' },
}

export function getBadgeById(id) {
  return BADGES.find(b => b.id === id)
}

export function getTotalXPFromBadges(unlockedBadges) {
  return unlockedBadges.reduce((total, badgeId) => {
    const badge = getBadgeById(badgeId)
    return total + (badge?.xp || 0)
  }, 0)
}

export function checkNewBadges(state, unlockedBadges) {
  const newBadges = []
  
  if (!unlockedBadges.includes('first-login')) {
    newBadges.push('first-login')
  }
  
  if (state.timesheetStats?.submitted >= 1 && !unlockedBadges.includes('first-timesheet')) {
    newBadges.push('first-timesheet')
  }
  
  if (state.timesheetStats?.submitted >= 10 && !unlockedBadges.includes('timesheet-master')) {
    newBadges.push('timesheet-master')
  }
  
  if (state.streak >= 7 && !unlockedBadges.includes('streak-7')) {
    newBadges.push('streak-7')
  }
  
  if (state.streak >= 30 && !unlockedBadges.includes('streak-30')) {
    newBadges.push('streak-30')
  }
  
  return newBadges
}
