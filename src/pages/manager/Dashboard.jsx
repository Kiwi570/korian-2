import { Link } from 'react-router-dom'
import { Users, CheckSquare, AlertTriangle, TrendingUp, ArrowRight, Clock, Calendar, BarChart3 } from 'lucide-react'
import { Card, StatCard, Button, Badge, Avatar, ProgressBar } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { getGreeting } from '@/lib/utils'
import { getAvatarUrl } from '@/lib/images'
import { DEMO_TEAM } from '@/lib/constants'

export default function ManagerDashboard() {
  const { user, pendingApprovals } = useApp()
  const greeting = getGreeting()
  const totalPending = pendingApprovals.timesheets.length + pendingApprovals.leaves.length
  const teamStats = { total: DEMO_TEAM.length, present: DEMO_TEAM.filter(m => m.status === 'present').length, remote: DEMO_TEAM.filter(m => m.status === 'remote').length, leave: DEMO_TEAM.filter(m => m.status === 'leave').length }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-8 text-white animate-fade-in">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-[60px]" />
        <div className="flex items-center gap-6">
          <Avatar src={user?.avatar} name={user?.fullName} size="xl" status="online" />
          <div>
            <p className="text-white/80 text-sm">{greeting.emoji} {greeting.text}</p>
            <h1 className="text-3xl font-display font-bold">{user?.firstName} !</h1>
            <p className="text-white/80">Vous avez {totalPending} approbations en attente</p>
          </div>
        </div>
      </div>

      {totalPending > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600 animate-bounce-gentle" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white">Actions requises</h3>
              <p className="text-sm text-slate-600">{pendingApprovals.timesheets.length} timesheets et {pendingApprovals.leaves.length} congés à valider</p>
            </div>
            <Link to="/manager/approvals"><Button><CheckSquare className="w-4 h-4" /> Voir</Button></Link>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Mon équipe" value={teamStats.total} color="blue" />
        <StatCard icon={CheckSquare} label="Présents" value={teamStats.present} color="emerald" />
        <StatCard icon={Calendar} label="Congés" value={teamStats.leave} color="purple" />
        <StatCard icon={AlertTriangle} label="À valider" value={totalPending} color="gold" />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mon équipe</h2>
          <Link to="/manager/team"><Button variant="ghost" size="sm">Voir tout <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
        <div className="space-y-3">
          {DEMO_TEAM.slice(0, 5).map(m => (
            <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-700 transition-colors">
              <Avatar src={getAvatarUrl(m.fullName)} name={m.fullName} size="md" status={m.status === 'present' ? 'online' : m.status === 'remote' ? 'away' : 'offline'} />
              <div className="flex-1"><p className="font-semibold text-slate-900 dark:text-white">{m.fullName}</p><p className="text-sm text-slate-500">{m.client}</p></div>
              <Badge variant={m.status === 'present' ? 'success' : m.status === 'remote' ? 'info' : 'default'}>{m.status === 'present' ? 'Présent' : m.status === 'remote' ? 'Remote' : 'Congés'}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
