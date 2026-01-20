import { useState } from 'react'
import { Calendar, Plus, X } from 'lucide-react'
import { Card, Button, Badge, Modal, Input, Select, Textarea, TabsHeader, EmptyState, useToast } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { cn, formatDate } from '@/lib/utils'
import { LEAVE_TYPES, LEAVE_STATUS_CONFIG } from '@/lib/constants'

export default function LeavePage() {
  const { leaveBalance } = useApp()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('all')
  const [showNewModal, setShowNewModal] = useState(false)
  const [leaves] = useState([
    { id: '1', type: 'annual', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, status: 'pending', reason: 'Vacances ski' },
    { id: '2', type: 'remote', startDate: '2025-01-20', endDate: '2025-01-20', days: 1, status: 'approved', reason: 'Rendez-vous médical' },
  ])

  const tabs = [
    { id: 'all', label: 'Toutes', count: leaves.length },
    { id: 'pending', label: 'En attente', count: leaves.filter(l => l.status === 'pending').length },
    { id: 'approved', label: 'Approuvées', count: leaves.filter(l => l.status === 'approved').length },
  ]

  const filteredLeaves = activeTab === 'all' ? leaves : leaves.filter(l => l.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Gestion des congés</h1>
          <p className="text-slate-500 dark:text-slate-400">Demandez et suivez vos congés</p>
        </div>
        <Button onClick={() => setShowNewModal(true)}><Plus className="w-4 h-4" /> Nouvelle demande</Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-emerald-600">{leaveBalance.remaining}</p>
          <p className="text-sm text-slate-500">Jours restants</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-blue-600">{leaveBalance.annual}</p>
          <p className="text-sm text-slate-500">Solde annuel</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-slate-600">{leaveBalance.taken}</p>
          <p className="text-sm text-slate-500">Jours pris</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-amber-600">{leaveBalance.pending}</p>
          <p className="text-sm text-slate-500">En attente</p>
        </Card>
      </div>

      {/* List */}
      <Card>
        <TabsHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        
        {filteredLeaves.length === 0 ? (
          <EmptyState icon={Calendar} title="Aucune demande" description="Vous n'avez pas encore de demande de congé" />
        ) : (
          <div className="space-y-3">
            {filteredLeaves.map(leave => {
              const type = LEAVE_TYPES.find(t => t.id === leave.type)
              const status = LEAVE_STATUS_CONFIG[leave.status]
              return (
                <div key={leave.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-700 hover:bg-slate-100 dark:hover:bg-dark-600 transition-colors">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', type?.color)}>
                    {type?.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{type?.label}</p>
                    <p className="text-sm text-slate-500">{formatDate(leave.startDate)} → {formatDate(leave.endDate)} • {leave.days} jour(s)</p>
                  </div>
                  <Badge variant={status?.variant}>{status?.label}</Badge>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* New Leave Modal */}
      <Modal isOpen={showNewModal} onClose={() => setShowNewModal(false)} title="Nouvelle demande de congé" size="md">
        <form className="space-y-4">
          <Select label="Type de congé" options={LEAVE_TYPES.map(t => ({ value: t.id, label: `${t.emoji} ${t.label}` }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date de début" type="date" />
            <Input label="Date de fin" type="date" />
          </div>
          <Textarea label="Motif (optionnel)" placeholder="Raison de votre demande..." rows={3} />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowNewModal(false)} className="flex-1">Annuler</Button>
            <Button type="submit" className="flex-1">Soumettre</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
