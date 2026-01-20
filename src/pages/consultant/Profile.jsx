import { Camera, Mail, Phone, Building, Calendar } from 'lucide-react'
import { Card, Button, Input, Avatar, Badge, TabsHeader } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { formatDate } from '@/lib/utils'
import { IMAGES } from '@/lib/images'
import { useState } from 'react'

export default function ProfilePage() {
  const { user, mission } = useApp()
  const [activeTab, setActiveTab] = useState('info')
  const tabs = [
    { id: 'info', label: 'Informations' },
    { id: 'mission', label: 'Mission' },
    { id: 'security', label: 'Sécurité' },
  ]

  return (
    <div className="space-y-6">
      {/* Cover */}
      <div className="relative h-48 rounded-3xl overflow-hidden">
        <img src={IMAGES.profileCover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      {/* Profile Card */}
      <Card className="-mt-20 relative z-10 mx-4">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 mb-6">
          <div className="relative group">
            <Avatar src={user?.avatar} name={user?.fullName} size="2xl" />
            <button className="absolute bottom-0 right-0 p-2 bg-gold-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{user?.fullName}</h1>
            <p className="text-slate-500">{user?.title}</p>
            <Badge variant="gold" className="mt-2">{user?.role}</Badge>
          </div>
        </div>

        <TabsHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'info' && (
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Prénom" defaultValue={user?.firstName} icon={null} />
            <Input label="Nom" defaultValue={user?.lastName} />
            <Input label="Email" defaultValue={user?.email} icon={Mail} />
            <Input label="Téléphone" defaultValue={user?.phone} icon={Phone} />
            <Input label="Département" defaultValue={user?.department} icon={Building} disabled />
            <Input label="Date d'entrée" defaultValue={formatDate(user?.startDate)} icon={Calendar} disabled />
          </div>
        )}

        {activeTab === 'mission' && mission && (
          <div className="p-6 bg-slate-50 dark:bg-dark-700 rounded-2xl">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Mission actuelle</h3>
            <div className="space-y-3">
              <p><span className="text-slate-500">Client :</span> <span className="font-semibold text-slate-900 dark:text-white">{mission.clientName}</span></p>
              <p><span className="text-slate-500">Projet :</span> <span className="font-semibold">{mission.projectName}</span></p>
              <p><span className="text-slate-500">Lieu :</span> {mission.location}</p>
              <p><span className="text-slate-500">Période :</span> {formatDate(mission.startDate)} → {formatDate(mission.endDate)}</p>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <Input label="Mot de passe actuel" type="password" placeholder="••••••••" />
            <Input label="Nouveau mot de passe" type="password" placeholder="••••••••" />
            <Input label="Confirmer" type="password" placeholder="••••••••" />
            <Button>Mettre à jour le mot de passe</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
