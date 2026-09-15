export default function ProgressBar({ value, max = 100, color = 'bg-amber-500', label }) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600 dark:text-slate-400">{label}</span>
          <span className="font-semibold text-slate-800 dark:text-white">{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}