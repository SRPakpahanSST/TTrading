import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/watchlist', label: 'Watchlist', icon: '⭐' },
  { path: '/streak', label: 'Streak', icon: '🔥' },
  { path: '/screener', label: 'Screener', icon: '🔍' },
  { path: '/kalender', label: 'Kalender', icon: '📅' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { path: '/badge', label: 'Badge', icon: '🏅' },
  { path: '/simulasi', label: 'Simulasi', icon: '🎮' },
  { path: '/jurnal', label: 'Jurnal', icon: '📓' },
  { path: '/analisis', label: 'Analisis', icon: '📈' },
  { path: '/dosa', label: '7 Dosa Dagang', icon: '🧠' },
  { path: '/meditasi', label: 'Meditasi', icon: '🧘' },
  { path: '/kalkulator', label: 'Kalkulator', icon: '💰' },
  { path: '/amal', label: 'Amal', icon: '🤝' },
  { path: '/pengaturan', label: 'Pengaturan', icon: '⚙️' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 pt-20 lg:pt-4 overflow-y-auto h-full">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-slate-700 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Mantra</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 italic">
              "Sabar menunggu, cepat bertindak."
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}