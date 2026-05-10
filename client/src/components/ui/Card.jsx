export default function Card({ title, icon: Icon, children, className = '' }) {
  return (
    <div
      className={`border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 shadow-sm ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-light-primary dark:text-dark-primary">
            {title}
          </h3>
          {Icon && <Icon size={20} className="text-light-secondary dark:text-dark-secondary" />}
        </div>
      )}
      {children}
    </div>
  )
}
