import Card from '../ui/Card'

export default function MantraCard({ mantra }) {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
      <div className="flex items-center gap-4">
        <span className="text-4xl">🧘</span>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Mantra Hari Ini</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white">
            "{mantra}"
          </p>
        </div>
      </div>
    </Card>
  )
}