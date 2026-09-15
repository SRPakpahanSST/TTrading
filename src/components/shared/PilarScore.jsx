import ProgressBar from '../ui/ProgressBar'

export default function PilarScore({ pilar, skor, warna, rekomendasi }) {
  return (
    <div className="mb-4">
      <ProgressBar
        value={skor}
        max={10}
        color={warna}
        label={pilar}
      />
      {rekomendasi && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          💡 {rekomendasi}
        </p>
      )}
    </div>
  )
}