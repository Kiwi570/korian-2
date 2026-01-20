import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Save, Send, Plus, Minus, Clock, CheckCircle } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, Button, Badge, Textarea, Modal, ConfirmModal, SuccessModal, ProgressBar, useToast } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { cn, triggerConfetti } from '@/lib/utils'
import { getHolidayInfo, TIMESHEET_STATUS_CONFIG } from '@/lib/constants'

export default function TimesheetPage() {
  const { timesheet, timesheetStats, updateTimesheetEntry, updateTimesheetRemarks, saveTimesheet, submitTimesheet } = useApp()
  const toast = useToast()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDayOfWeek = getDay(monthStart)
  const emptyDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

  const handleDayClick = (day) => {
    const dayOfWeek = getDay(day)
    const dateStr = format(day, 'yyyy-MM-dd')
    const holiday = getHolidayInfo(dateStr)
    if (dayOfWeek === 0 || dayOfWeek === 6 || holiday) return
    setSelectedDay(day)
  }

  const handleSaveEntry = (hours, overtime) => {
    const dateStr = format(selectedDay, 'yyyy-MM-dd')
    updateTimesheetEntry(dateStr, { hours, overtime })
    setSelectedDay(null)
    toast.success('Heures enregistrées', `${hours}h + ${overtime}h supplémentaires`)
  }

  const handleSave = async () => {
    setSaving(true)
    await saveTimesheet()
    setSaving(false)
    toast.success('Brouillon sauvegardé', 'Vos modifications ont été enregistrées')
  }

  const handleSubmit = async () => {
    setShowConfirm(false)
    setSubmitting(true)
    await submitTimesheet()
    setSubmitting(false)
    triggerConfetti()
    setShowSuccess(true)
  }

  const getDayClasses = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dayOfWeek = getDay(day)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const holiday = getHolidayInfo(dateStr)
    const isTodayDate = isToday(day)
    const entry = timesheet.entries[dateStr]
    const hasFilled = entry?.hours > 0
    const hasOvertime = entry?.overtime > 0

    return cn(
      'calendar-day',
      isWeekend && 'weekend',
      holiday && 'holiday',
      !isWeekend && !holiday && hasFilled && !hasOvertime && 'filled',
      !isWeekend && !holiday && hasOvertime && 'overtime',
      isTodayDate && 'today'
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-500 via-amber-500 to-gold-600 p-6 md:p-8 text-white animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-6 h-6" />
              <h1 className="text-2xl md:text-3xl font-display font-bold">Feuille de temps</h1>
            </div>
            <p className="text-white/80 capitalize">{format(currentDate, 'MMMM yyyy', { locale: fr })}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={cn('text-sm', TIMESHEET_STATUS_CONFIG[timesheet.status]?.bg, TIMESHEET_STATUS_CONFIG[timesheet.status]?.text)}>
              {TIMESHEET_STATUS_CONFIG[timesheet.status]?.label}
            </Badge>
            <Button variant="outline-white" size="sm"><Download className="w-4 h-4" /> Export</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">
            {timesheetStats.filledDays}<span className="text-lg text-slate-400">/{timesheetStats.workingDays}</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">Jours remplis</p>
          <ProgressBar value={timesheetStats.filledDays} max={timesheetStats.workingDays} size="sm" color="emerald" className="mt-3" />
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">
            {timesheetStats.totalHours}<span className="text-lg text-slate-400">h</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">Heures totales</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-amber-600 tabular-nums">
            {timesheetStats.overtimeHours}<span className="text-lg text-slate-400">h</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">Heures sup.</p>
        </Card>
        <Card hover3D className="text-center p-5">
          <p className="text-4xl font-bold text-emerald-600 tabular-nums">
            {timesheetStats.progress}<span className="text-lg text-slate-400">%</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">Progression</p>
        </Card>
      </div>

      {/* Calendar */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-dark-700 flex items-center justify-between bg-slate-50 dark:bg-dark-800">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 rounded-xl hover:bg-white dark:hover:bg-dark-700 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{format(currentDate, 'MMMM yyyy', { locale: fr })}</h2>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 rounded-xl hover:bg-white dark:hover:bg-dark-700 transition-colors shadow-sm">
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
              <div key={d} className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: emptyDays }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const holiday = getHolidayInfo(dateStr)
              const entry = timesheet.entries[dateStr]
              return (
                <div key={dateStr} onClick={() => handleDayClick(day)} className={getDayClasses(day)}>
                  <span className={cn('text-sm font-semibold', isToday(day) ? 'text-gold-600 dark:text-gold-400' : 'text-slate-700 dark:text-slate-300')}>
                    {format(day, 'd')}
                  </span>
                  {holiday && <span className="block text-[10px] text-rose-600 dark:text-rose-400 truncate mt-0.5">{holiday.emoji}</span>}
                  {entry?.hours > 0 && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{entry.hours}h</span>
                      {entry.overtime > 0 && <span className="text-xs text-amber-600 dark:text-amber-400">+{entry.overtime}</span>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-dark-700 flex flex-wrap gap-4 text-sm bg-slate-50 dark:bg-dark-800">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300" /><span className="text-slate-600 dark:text-slate-400">Rempli</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-amber-100 dark:bg-amber-500/20 border border-amber-300" /><span className="text-slate-600 dark:text-slate-400">Heures sup.</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-100 dark:bg-dark-700 border border-slate-300" /><span className="text-slate-600 dark:text-slate-400">Week-end</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-rose-100 dark:bg-rose-500/20 border border-rose-300" /><span className="text-slate-600 dark:text-slate-400">Férié</span></div>
        </div>
      </Card>

      {/* Remarks */}
      <Card>
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Remarques</h3>
        <Textarea placeholder="Ajoutez des remarques pour votre manager..." value={timesheet.remarks} onChange={(e) => updateTimesheetRemarks(e.target.value)} rows={3} />
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="secondary" onClick={handleSave} loading={saving} className="flex-1">
          <Save className="w-4 h-4" /> Enregistrer brouillon
        </Button>
        <Button onClick={() => setShowConfirm(true)} disabled={timesheetStats.progress < 100 || timesheet.status !== 'draft'} className="flex-1">
          <Send className="w-4 h-4" /> Soumettre pour validation
        </Button>
      </div>

      {/* Day Editor Modal */}
      {selectedDay && (
        <DayEditorModal
          day={selectedDay}
          entry={timesheet.entries[format(selectedDay, 'yyyy-MM-dd')] || { hours: 8, overtime: 0 }}
          onSave={handleSaveEntry}
          onClose={() => setSelectedDay(null)}
        />
      )}

      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleSubmit} title="Confirmer la soumission" message="Une fois soumis, vous ne pourrez plus modifier votre timesheet." confirmText="Soumettre" loading={submitting} />
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Timesheet soumis ! 🎉" message="Votre manager a été notifié. Vous avez gagné 50 XP !" />
    </div>
  )
}

function DayEditorModal({ day, entry, onSave, onClose }) {
  const [hours, setHours] = useState(entry.hours || 8)
  const [overtime, setOvertime] = useState(entry.overtime || 0)

  return (
    <Modal isOpen onClose={onClose} title={format(day, 'EEEE d MMMM yyyy', { locale: fr })} size="sm">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Heures normales</label>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setHours(Math.max(0, hours - 1))} className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
              <Minus className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
            <span className="text-5xl font-bold text-slate-900 dark:text-white w-24 text-center tabular-nums">{hours}h</span>
            <button onClick={() => setHours(Math.min(10, hours + 1))} className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
              <Plus className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Heures supplémentaires</label>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setOvertime(Math.max(0, overtime - 1))} className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
              <Minus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </button>
            <span className="text-5xl font-bold text-amber-600 dark:text-amber-400 w-24 text-center tabular-nums">{overtime}h</span>
            <button onClick={() => setOvertime(Math.min(4, overtime + 1))} className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
              <Plus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-dark-700 rounded-xl text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total pour ce jour</p>
          <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">{hours + overtime}h</p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">Annuler</Button>
          <Button onClick={() => onSave(hours, overtime)} className="flex-1">
            <CheckCircle className="w-4 h-4" /> Enregistrer
          </Button>
        </div>
      </div>
    </Modal>
  )
}
