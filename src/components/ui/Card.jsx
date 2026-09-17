export default function Card({ children, className = '', title, icon, onClick }) {
  const isClickable = typeof onClick === 'function'

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-200 ${
        isClickable
          ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]'
          : ''
      } ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
        </div>
      )}
      {children}
    </div>
  )
}