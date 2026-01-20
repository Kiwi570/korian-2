import { useState } from 'react'
import { FileText, Download, Eye, Search } from 'lucide-react'
import { Card, Button, Badge, TabsHeader, SearchInput, EmptyState } from '@/components/ui'
import { cn, formatDate } from '@/lib/utils'
import { DEMO_DOCUMENTS, DOCUMENT_CATEGORIES } from '@/lib/constants'

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = DEMO_DOCUMENTS.filter(doc => {
    const matchesTab = activeTab === 'all' || doc.category === activeTab
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const tabs = DOCUMENT_CATEGORIES.map(cat => ({
    id: cat.id,
    label: `${cat.emoji} ${cat.label}`,
    count: cat.id === 'all' ? DEMO_DOCUMENTS.length : DEMO_DOCUMENTS.filter(d => d.category === cat.id).length
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Mes documents</h1>
        <p className="text-slate-500 dark:text-slate-400">Fiches de paie, contrats et autres documents</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TabsHeader tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <SearchInput value={search} onChange={setSearch} placeholder="Rechercher..." className="md:ml-auto md:w-64" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title="Aucun document" description="Aucun document ne correspond à votre recherche" />
        ) : (
          <div className="space-y-3">
            {filtered.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-700 hover:bg-slate-100 dark:hover:bg-dark-600 transition-all group hover:scale-[1.01]">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white truncate flex items-center gap-2">
                    {doc.name}
                    {doc.isNew && <Badge variant="success" size="xs">Nouveau</Badge>}
                    {doc.signed && <Badge variant="info" size="xs">Signé</Badge>}
                  </p>
                  <p className="text-sm text-slate-500">{formatDate(doc.date)} • {doc.size}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
