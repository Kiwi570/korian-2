export const APP_VERSION = '6.0.0'
export const APP_NAME = 'LUX-AS Portal'

export const ROLES = {
  CONSULTANT: 'consultant',
  MANAGER: 'manager',
}

export const DEMO_USERS = {
  consultant: {
    id: 'user-1',
    email: 'paul@lux-as.com',
    password: 'demo123',
    firstName: 'Paul',
    lastName: 'Schneider',
    fullName: 'Paul Schneider',
    role: ROLES.CONSULTANT,
    title: 'Senior Consultant',
    phone: '+352 621 123 456',
    department: 'IT Consulting',
    startDate: '2024-01-15',
    managerId: 'user-2',
    managerName: 'Korian Weber',
  },
  manager: {
    id: 'user-2',
    email: 'korian@lux-as.com',
    password: 'demo123',
    firstName: 'Korian',
    lastName: 'Weber',
    fullName: 'Korian Weber',
    role: ROLES.MANAGER,
    title: 'Team Manager',
    phone: '+352 621 789 012',
    department: 'IT Consulting',
    startDate: '2020-03-01',
  },
}

export const NAV_ITEMS_CONSULTANT = [
  { path: '/consultant', label: 'Dashboard', icon: 'LayoutDashboard', exact: true },
  { path: '/consultant/timesheet', label: 'Timesheet', icon: 'Clock' },
  { path: '/consultant/leave', label: 'Congés', icon: 'Calendar' },
  { path: '/consultant/documents', label: 'Documents', icon: 'FileText' },
  { path: '/consultant/achievements', label: 'Succès', icon: 'Trophy' },
]

export const NAV_ITEMS_MANAGER = [
  { path: '/manager', label: 'Dashboard', icon: 'LayoutDashboard', exact: true },
  { path: '/manager/approvals', label: 'Approbations', icon: 'CheckSquare', badge: true },
  { path: '/manager/team', label: 'Mon Équipe', icon: 'Users' },
  { path: '/manager/reports', label: 'Rapports', icon: 'BarChart3' },
]

export const LUX_HOLIDAYS_2025 = [
  { date: '2025-01-01', name: 'Nouvel An', emoji: '🎉' },
  { date: '2025-04-21', name: 'Lundi de Pâques', emoji: '🐣' },
  { date: '2025-05-01', name: 'Fête du Travail', emoji: '⚒️' },
  { date: '2025-05-09', name: 'Journée de l\'Europe', emoji: '🇪🇺' },
  { date: '2025-05-29', name: 'Ascension', emoji: '✨' },
  { date: '2025-06-09', name: 'Lundi de Pentecôte', emoji: '🕊️' },
  { date: '2025-06-23', name: 'Fête Nationale', emoji: '🇱🇺' },
  { date: '2025-08-15', name: 'Assomption', emoji: '⛪' },
  { date: '2025-11-01', name: 'Toussaint', emoji: '🕯️' },
  { date: '2025-12-25', name: 'Noël', emoji: '🎄' },
  { date: '2025-12-26', name: 'Saint-Étienne', emoji: '🎁' },
]

export const LUX_HOLIDAYS_DATES = LUX_HOLIDAYS_2025.map(h => h.date)

export function getHolidayInfo(dateStr) {
  return LUX_HOLIDAYS_2025.find(h => h.date === dateStr) || null
}

export const TIMESHEET_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const TIMESHEET_STATUS_CONFIG = {
  draft: { label: 'Brouillon', bg: 'bg-slate-100 dark:bg-slate-500/20', text: 'text-slate-600 dark:text-slate-400', color: 'slate' },
  submitted: { label: 'Soumis', bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400', color: 'amber' },
  approved: { label: 'Approuvé', bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400', color: 'emerald' },
  rejected: { label: 'Rejeté', bg: 'bg-rose-100 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400', color: 'rose' },
}

export const LEAVE_TYPES = [
  { id: 'annual', label: 'Congé annuel', emoji: '🏖️', color: 'bg-blue-100 text-blue-700' },
  { id: 'sick', label: 'Maladie', emoji: '🤒', color: 'bg-rose-100 text-rose-700' },
  { id: 'family', label: 'Événement familial', emoji: '👨‍👩‍👧', color: 'bg-purple-100 text-purple-700' },
  { id: 'remote', label: 'Télétravail', emoji: '🏠', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'training', label: 'Formation', emoji: '📚', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'other', label: 'Autre', emoji: '📋', color: 'bg-slate-100 text-slate-700' },
]

export const LEAVE_STATUS_CONFIG = {
  pending: { label: 'En attente', variant: 'warning' },
  approved: { label: 'Approuvé', variant: 'success' },
  rejected: { label: 'Refusé', variant: 'error' },
  cancelled: { label: 'Annulé', variant: 'default' },
}

export const DEMO_MISSION = {
  id: 'mission-1',
  clientName: 'BGL BNP Paribas',
  projectName: 'Migration Core Banking',
  location: 'Luxembourg-Kirchberg',
  startDate: '2024-01-15',
  endDate: '2025-12-31',
  description: 'Migration et modernisation du système core banking.',
}

export const DEMO_TEAM = [
  { id: 'team-1', fullName: 'Marie Dupont', title: 'Senior Consultant', email: 'marie@lux-as.com', client: 'BGL BNP Paribas', status: 'present' },
  { id: 'team-2', fullName: 'Thomas Weber', title: 'Consultant', email: 'thomas@lux-as.com', client: 'POST Luxembourg', status: 'present' },
  { id: 'team-3', fullName: 'Julie Martin', title: 'Senior Consultant', email: 'julie@lux-as.com', client: 'Banque de Luxembourg', status: 'leave' },
  { id: 'team-4', fullName: 'Pierre Durand', title: 'Consultant', email: 'pierre@lux-as.com', client: 'ArcelorMittal', status: 'present' },
  { id: 'team-5', fullName: 'Sophie Bernard', title: 'Junior Consultant', email: 'sophie@lux-as.com', client: 'SES', status: 'present' },
  { id: 'team-6', fullName: 'Lucas Petit', title: 'Consultant', email: 'lucas@lux-as.com', client: 'Clearstream', status: 'remote' },
]

export const FEATURES = [
  { id: 1, title: 'Timesheet intelligent', description: 'Calendrier interactif avec jours fériés luxembourgeois et saisie ultra-rapide.', icon: 'Clock', badge: 'Populaire', image: 'timesheet' },
  { id: 2, title: 'Gestion des congés', description: 'Demandez et suivez vos congés en quelques clics. Solde en temps réel.', icon: 'Calendar', badge: null, image: 'leave' },
  { id: 3, title: 'Gamification', description: 'Gagnez des XP, débloquez des badges et montez en niveau !', icon: 'Trophy', badge: 'Nouveau', image: 'gamification' },
]

export const QUICK_STATS = {
  consultants: 150,
  satisfaction: 98,
  approvalTime: '< 24h',
  majorClients: 25,
}

export const CLIENT_LOGOS = [
  { id: 1, name: 'BGL BNP Paribas', initials: 'BGL', color: '#009639' },
  { id: 2, name: 'POST Luxembourg', initials: 'POST', color: '#FFCC00' },
  { id: 3, name: 'Banque de Luxembourg', initials: 'BDL', color: '#003366' },
  { id: 4, name: 'ArcelorMittal', initials: 'AM', color: '#F26F21' },
  { id: 5, name: 'SES', initials: 'SES', color: '#00A0E3' },
  { id: 6, name: 'Clearstream', initials: 'CS', color: '#00205B' },
]

export const CONTACT_INFO = {
  address: '2 Rue du Fort Thüngen, L-1499 Luxembourg',
  phone: '+352 26 20 30 40',
  email: 'contact@lux-as-consulting.com',
}

export const DEMO_DOCUMENTS = [
  { id: 'doc-1', name: 'Fiche de paie - Janvier 2025', category: 'payslips', date: '2025-01-31', size: '245 KB', isNew: true },
  { id: 'doc-2', name: 'Fiche de paie - Décembre 2024', category: 'payslips', date: '2024-12-31', size: '242 KB' },
  { id: 'doc-3', name: 'Contrat CDI', category: 'contracts', date: '2024-01-15', size: '1.2 MB', signed: true },
  { id: 'doc-4', name: 'Ordre de mission - BGL', category: 'missions', date: '2024-01-15', size: '89 KB' },
]

export const DOCUMENT_CATEGORIES = [
  { id: 'all', label: 'Tous', emoji: '📁' },
  { id: 'payslips', label: 'Fiches de paie', emoji: '💰' },
  { id: 'contracts', label: 'Contrats', emoji: '📝' },
  { id: 'missions', label: 'Missions', emoji: '🎯' },
]

export const XP_ACTIONS = {
  TIMESHEET_DAILY: 10,
  TIMESHEET_SUBMIT: 50,
  TIMESHEET_ONTIME: 100,
  LEAVE_REQUEST: 20,
  PROFILE_COMPLETE: 200,
  FIRST_LOGIN: 50,
  STREAK_7_DAYS: 150,
  STREAK_30_DAYS: 500,
}

export const LEVELS = [
  { level: 1, name: 'Débutant', minXP: 0, maxXP: 499, color: 'bg-slate-400', icon: '🌱' },
  { level: 2, name: 'Confirmé', minXP: 500, maxXP: 1499, color: 'bg-emerald-500', icon: '🌿' },
  { level: 3, name: 'Expert', minXP: 1500, maxXP: 3499, color: 'bg-blue-500', icon: '⭐' },
  { level: 4, name: 'Master', minXP: 3500, maxXP: 6999, color: 'bg-purple-500', icon: '💎' },
  { level: 5, name: 'Légende', minXP: 7000, maxXP: Infinity, color: 'bg-gold-500', icon: '👑' },
]

export function getLevelFromXP(xp) {
  return LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP) || LEVELS[0]
}

export function getXPProgress(xp) {
  const level = getLevelFromXP(xp)
  if (level.maxXP === Infinity) return 100
  const levelXP = xp - level.minXP
  const levelRange = level.maxXP - level.minXP
  return Math.round((levelXP / levelRange) * 100)
}

export function getXPToNextLevel(xp) {
  const level = getLevelFromXP(xp)
  if (level.maxXP === Infinity) return 0
  return level.maxXP - xp + 1
}
