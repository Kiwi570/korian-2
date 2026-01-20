import { BarChart3, TrendingUp, Clock, Calendar } from 'lucide-react'
import { Card, StatCard, Select, Button } from '@/components/ui'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { DEMO_TEAM } from '@/lib/constants'

const hoursData = DEMO_TEAM.map(m => ({ name: m.fullName.split(' ')[0], hours: Math.floor(Math.random() * 40) + 140, overtime: Math.floor(Math.random() * 10) }))
const leaveData = [{ name: 'Annuel', value: 45, color: '#3b82f6' }, { name: 'Maladie', value: 12, color: '#f43f5e' }, { name: 'Formation', value: 8, color: '#8b5cf6' }]
const trendData = [{ month: 'Sep', hours: 920 }, { month: 'Oct', hours: 980 }, { month: 'Nov', hours: 1050 }, { month: 'Dec', hours: 890 }, { month: 'Jan', hours: 1020 }]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Rapports</h1><p className="text-slate-500">Statistiques</p></div><Button variant="secondary">Exporter</Button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Heures totales" value={1020} suffix="h" trend="+5%" trendUp color="gold" />
        <StatCard icon={TrendingUp} label="Complétion" value={94} suffix="%" color="emerald" />
        <StatCard icon={BarChart3} label="Heures sup." value={32} suffix="h" color="purple" />
        <StatCard icon={Calendar} label="Congés" value={70} suffix="j" color="blue" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card><h3 className="font-bold text-slate-900 dark:text-white mb-4">Heures par consultant</h3><ResponsiveContainer width="100%" height={250}><BarChart data={hoursData} layout="vertical"><XAxis type="number" /><YAxis dataKey="name" type="category" width={60} /><Tooltip /><Bar dataKey="hours" fill="#f59e0b" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></Card>
        <Card><h3 className="font-bold text-slate-900 dark:text-white mb-4">Répartition congés</h3><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={leaveData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">{leaveData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card>
      </div>
      <Card><h3 className="font-bold text-slate-900 dark:text-white mb-4">Évolution</h3><ResponsiveContainer width="100%" height={250}><LineChart data={trendData}><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="hours" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} /></LineChart></ResponsiveContainer></Card>
    </div>
  )
}
