import { Moon, Sun, Bell, Globe, HelpCircle, ExternalLink } from 'lucide-react'
import { Card, Toggle, Button, Badge } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { APP_VERSION, CONTACT_INFO } from '@/lib/constants'

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useApp()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Paramètres</h1>
        <p className="text-slate-500">Personnalisez votre expérience</p>
      </div>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Apparence</h2>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-700 rounded-xl">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-indigo-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Mode sombre</p>
              <p className="text-sm text-slate-500">{darkMode ? 'Activé' : 'Désactivé'}</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-14 h-8 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Notifications</h2>
        <div className="space-y-2">
          <Toggle label="Notifications par email" description="Recevoir les alertes par email" checked={true} onChange={() => {}} />
          <Toggle label="Notifications push" description="Notifications dans le navigateur" checked={false} onChange={() => {}} />
          <Toggle label="Rapport hebdomadaire" description="Résumé chaque lundi" checked={true} onChange={() => {}} />
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Langue</h2>
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-dark-700 rounded-xl">
          <Globe className="w-5 h-5 text-slate-400" />
          <span className="font-medium text-slate-900 dark:text-white">Français</span>
          <Badge variant="info" size="xs">Luxembourg</Badge>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Support</h2>
        <div className="space-y-2">
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-700 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900 dark:text-white">Contacter le support</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">À propos</h2>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Version</span>
          <Badge variant="gold">{APP_VERSION}</Badge>
        </div>
        <p className="text-sm text-slate-400 mt-4">© 2025 LUX-AS Consulting. Tous droits réservés.</p>
      </Card>
    </div>
  )
}
