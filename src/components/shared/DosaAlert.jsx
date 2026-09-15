import Badge from '../ui/Badge'

export default function DosaAlert({ dosa, status, pesan }) {
  const statusColor = {
    aman: 'green',
    waspada: 'yellow',
    bahaya: 'red',
  }

  const statusIcon = {
    aman: '✅',
    waspada: '⚠️',
    bahaya: '🚨',
  }

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-slate-800 dark:text-white">
            {statusIcon[status]} {dosa}
          </span>
          <Badge color={statusColor[status]}>{status}</Badge>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{pesan}</p>
      </div>
    </div>
  )
}