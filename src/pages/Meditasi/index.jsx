import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function Meditasi() {
  const [timer, setTimer] = useState(300) // 5 menit = 300 detik
  const [isRunning, setIsRunning] = useState(false)
  const [emosi, setEmosi] = useState('tenang')

  useEffect(() => {
    let interval
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000)
    } else if (timer === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timer])

  const formatTime = (detik) => {
    const m = Math.floor(detik / 60)
    const s = detik % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimer(300)
    setIsRunning(false)
  }

  const mantra = [
    "Sabar menunggu, cepat bertindak.",
    "Hati tenang, tangan cepat.",
    "Pasar selalu benar.",
    "Ambil untungmu, jangan serakah.",
    "Cut loss, jangan berharap.",
  ]

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🧘 Meditasi Trading
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Latih hati yang tenang sebelum trading.
        </p>
      </div>

      {/* TIMER MEDITASI */}
      <Card className="text-center">
        <div className="py-8">
          <div className="text-6xl font-bold text-amber-500 mb-4">
            {formatTime(timer)}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {isRunning ? 'Bernapaslah dengan tenang...' : 'Siap untuk memulai?'}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant={isRunning ? 'danger' : 'primary'}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? '⏸️ Jeda' : '▶️ Mulai'}
            </Button>
            <Button variant="secondary" onClick={resetTimer}>
              🔄 Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* CEK EMOSI */}
      <Card title="💭 Cek Emosi" icon="">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Bagaimana perasaanmu saat ini?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'tenang', label: 'Tenang', icon: '😌' },
            { value: 'cemas', label: 'Cemas', icon: '😰' },
            { value: 'serakah', label: 'Serakah', icon: '🤑' },
            { value: 'ragu', label: 'Ragu', icon: '🤔' },
          ].map((e) => (
            <button
              key={e.value}
              onClick={() => setEmosi(e.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                emosi === e.value
                  ? 'border-amber-500 bg-amber-50 dark:bg-slate-700'
                  : 'border-slate-200 dark:border-slate-600 hover:border-amber-300'
              }`}
            >
              <div className="text-3xl mb-2">{e.icon}</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {e.label}
              </div>
            </button>
          ))}
        </div>
        {emosi !== 'tenang' && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-300">
              ⚠️ Emosi Anda tidak stabil. Sebaiknya jangan trading dulu. 
              Lakukan meditasi sampai tenang.
            </p>
          </div>
        )}
      </Card>

      {/* MANTRA */}
      <Card title="📿 Mantra Harian" icon="">
        <div className="space-y-3">
          {mantra.map((m, index) => (
            <div
              key={index}
              className="p-4 bg-amber-50 dark:bg-slate-700 rounded-xl"
            >
              <p className="text-slate-700 dark:text-slate-200 italic">"{m}"</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}