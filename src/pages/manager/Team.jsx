import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Card, Badge, Avatar, SearchInput, TabsHeader } from '@/components/ui'
import { getAvatarUrl } from '@/lib/images'
import { DEMO_TEAM } from '@/lib/constants'

export default function TeamPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const tabs = [{ id: 'all', label: 'Tous', count: DEMO_TEAM.length }, { id: 'present', label: 'Présents', count: DEMO_TEAM.filter(m => m.status === 'present').length }, { id: 'remote', label: 'Remote', count: DEMO_TEAM.filter(m => m.status === 'remote').length }, { id: 'leave', label: 'Congés', count: DEMO_TEAM.filter(m => m.status === 'leave').length }]
  const filtered = DEMO_TEAM.filter(m => (activeTab === 'all' || m.status === activeTab) && m.fullName.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Mon équipe</h1><p className="text-slate-500">{DEMO_TEAM.length} membres</p></div>
      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6"><TabsHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} /><SearchInput value={search} onChange={setSearch} className="md:ml-auto md:w-64" /></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => (
            <div key={m.id} className="p-4 bg-slate-50 dark:bg-dark-700 rounded-2xl hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-3"><Avatar src={getAvatarUrl(m.fullName)} name={m.fullName} size="lg" status={m.status === 'present' ? 'online' : m.status === 'remote' ? 'away' : 'offline'} /><div><p className="font-bold text-slate-900 dark:text-white">{m.fullName}</p><p className="text-sm text-slate-500">{m.title}</p></div></div>
              <p className="text-sm text-slate-600 mb-1">🏢 {m.client}</p><p className="text-sm text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4" />{m.email}</p>
              <Badge className="mt-3" variant={m.status === 'present' ? 'success' : m.status === 'remote' ? 'info' : 'default'}>{m.status === 'present' ? '✅ Présent' : m.status === 'remote' ? '🏠 Remote' : '🏖️ Congés'}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
