import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Calendar, FileText } from 'lucide-react'
import { Card, Button, Badge, Avatar, TabsHeader, Modal, Textarea, EmptyState, useToast } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { formatDate, triggerConfetti } from '@/lib/utils'
import { getAvatarUrl } from '@/lib/images'
import { LEAVE_TYPES } from '@/lib/constants'

export default function ApprovalsPage() {
  const { pendingApprovals } = useApp()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('timesheets')
  const [rejectModal, setRejectModal] = useState(null)
  const tabs = [{ id: 'timesheets', label: 'Timesheets', count: pendingApprovals.timesheets.length }, { id: 'leaves', label: 'Congés', count: pendingApprovals.leaves.length }]
  const handleApprove = () => { triggerConfetti(); toast.success('Approuvé !', 'La demande a été approuvée') }
  const handleReject = () => { setRejectModal(null); toast.info('Refusé', 'La demande a été refusée') }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Approbations</h1><p className="text-slate-500">Gérez les demandes de votre équipe</p></div>
      <div className="grid grid-cols-2 gap-4">
        <Card hover3D className="text-center p-5"><p className="text-4xl font-bold text-gold-600">{pendingApprovals.timesheets.length}</p><p className="text-sm text-slate-500">Timesheets</p></Card>
        <Card hover3D className="text-center p-5"><p className="text-4xl font-bold text-indigo-600">{pendingApprovals.leaves.length}</p><p className="text-sm text-slate-500">Congés</p></Card>
      </div>
      <Card>
        <TabsHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'timesheets' && (pendingApprovals.timesheets.length === 0 ? <EmptyState icon={FileText} title="Aucun timesheet" /> : (
          <div className="space-y-4">{pendingApprovals.timesheets.map(ts => (
            <div key={ts.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-dark-700 rounded-xl">
              <Avatar src={getAvatarUrl(ts.consultantName)} name={ts.consultantName} size="lg" />
              <div className="flex-1"><p className="font-semibold text-slate-900 dark:text-white">{ts.consultantName}</p><p className="text-sm text-slate-500">{ts.month} • {ts.hours}h + {ts.overtime}h sup.</p></div>
              <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setRejectModal(ts)}><XCircle className="w-4 h-4 text-rose-500" /></Button><Button size="sm" onClick={handleApprove}><CheckCircle className="w-4 h-4" /> Approuver</Button></div>
            </div>
          ))}</div>
        ))}
        {activeTab === 'leaves' && (pendingApprovals.leaves.length === 0 ? <EmptyState icon={Calendar} title="Aucune demande" /> : (
          <div className="space-y-4">{pendingApprovals.leaves.map(l => {
            const type = LEAVE_TYPES.find(t => t.id === l.type)
            return (
              <div key={l.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-dark-700 rounded-xl">
                <Avatar src={getAvatarUrl(l.consultantName)} name={l.consultantName} size="lg" />
                <div className="flex-1"><p className="font-semibold text-slate-900 dark:text-white">{l.consultantName}</p><p className="text-sm text-slate-500">{type?.emoji} {type?.label} • {formatDate(l.startDate)} → {formatDate(l.endDate)}</p></div>
                <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setRejectModal(l)}><XCircle className="w-4 h-4 text-rose-500" /></Button><Button size="sm" onClick={handleApprove}><CheckCircle className="w-4 h-4" /> Approuver</Button></div>
              </div>
            )
          })}</div>
        ))}
      </Card>
      <Modal isOpen={!!rejectModal} onClose={() => setRejectModal(null)} title="Motif du refus" size="sm">
        <Textarea placeholder="Expliquez..." rows={3} className="mb-4" />
        <div className="flex gap-3"><Button variant="secondary" onClick={() => setRejectModal(null)} className="flex-1">Annuler</Button><Button variant="danger" onClick={handleReject} className="flex-1">Refuser</Button></div>
      </Modal>
    </div>
  )
}
