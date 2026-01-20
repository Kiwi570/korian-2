const UNSPLASH = 'https://images.unsplash.com'

export const IMAGES = {
  hero: `${UNSPLASH}/photo-1486406146926-c627a92ad1ab?w=1920&q=80`,
  loginBg: `${UNSPLASH}/photo-1497366216548-37526070297c?w=1920&q=80`,
  profileCover: `${UNSPLASH}/photo-1557804506-669a67965ba0?w=1200&q=80`,
  timesheet: `${UNSPLASH}/photo-1611224923853-80b023f02d71?w=800&q=80`,
  leave: `${UNSPLASH}/photo-1507525428034-b723cf961d3e?w=800&q=80`,
  gamification: `${UNSPLASH}/photo-1614680376593-902f74cf0d41?w=800&q=80`,
  team: `${UNSPLASH}/photo-1522071820081-009f0129c71c?w=800&q=80`,
}

export const AVATARS = {
  'paul-schneider': `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=150&q=80`,
  'korian-weber': `${UNSPLASH}/photo-1472099645785-5658abf4ff4e?w=150&q=80`,
  'thomas-weber': `${UNSPLASH}/photo-1500648767791-00dcc994a43e?w=150&q=80`,
  'julie-martin': `${UNSPLASH}/photo-1438761681033-6461ffad8d80?w=150&q=80`,
  'pierre-durand': `${UNSPLASH}/photo-1519345182560-3f2917c472ef?w=150&q=80`,
  'sophie-bernard': `${UNSPLASH}/photo-1534528741775-53994a69daeb?w=150&q=80`,
  'lucas-petit': `${UNSPLASH}/photo-1506794778202-cad84cf45f1d?w=150&q=80`,
  default: `${UNSPLASH}/photo-1535713875002-d1d0cf377fde?w=150&q=80`,
}

export const TESTIMONIAL = {
  quote: "Le portail LUX-AS a transformé ma gestion quotidienne. Plus de paperasse, tout est fluide et intuitif !",
  name: 'Sophie Laurent',
  title: 'Senior Consultant',
  company: 'BGL BNP Paribas',
  avatar: AVATARS['sophie-bernard'],
  rating: 5,
}

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Le portail LUX-AS a transformé ma gestion quotidienne. Plus de paperasse, tout est fluide et intuitif !",
    name: 'Sophie Laurent',
    title: 'Senior Consultant',
    company: 'BGL BNP Paribas',
    avatar: AVATARS['sophie-bernard'],
    rating: 5,
  },
  {
    id: 2,
    quote: "Enfin un outil moderne pour gérer mes timesheets ! L'interface est magnifique et la gamification me motive.",
    name: 'Thomas Weber',
    title: 'Consultant DevOps',
    company: 'POST Luxembourg',
    avatar: AVATARS['thomas-weber'],
    rating: 5,
  },
  {
    id: 3,
    quote: "En tant que manager, je gagne un temps fou sur les approbations. Tout est centralisé et clair.",
    name: 'Julie Martin',
    title: 'Team Manager',
    company: 'Clearstream',
    avatar: AVATARS['julie-martin'],
    rating: 5,
  },
]

export function getAvatarUrl(name) {
  if (!name) return AVATARS.default
  const key = name.toLowerCase().replace(/\s+/g, '-')
  return AVATARS[key] || AVATARS.default
}
