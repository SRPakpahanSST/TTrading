import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'

const actions = [
  { icon: '📓', label: 'Jurnal', path: '/jurnal', warna: 'bg-blue-500' },
  { icon: '🎮', label: 'Simulasi', path: '/simulasi', warna: 'bg-purple-500' },
  { icon: '🧠', label: '7 Dosa', path: '/dosa', warna: 'bg-red-500' },
  { icon: '🧘', label: 'Meditasi', path: '/meditasi', warna: 'bg-green-500' },
  { icon: '💰', label: 'Kalkulator', path: '/kalkulator', warna: 'bg-amber-500' },
  { icon: '🤝', label: 'Amal', path: '/amal', warna: 'bg-pink-500' },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card title="⚡ Aksi Cepat" icon="">
      <div className="grid grid-cols-3 gap-3">
        {actions.map((a) => (
          <button
            key={a.path}
            onClick={() => navigate(a.path)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all hover:scale-105 active:scale-95"
          >
            <div className={`w-10 h-10 ${a.warna} rounded-xl flex items-center justify-center text-xl`}>
              {a.icon}
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}