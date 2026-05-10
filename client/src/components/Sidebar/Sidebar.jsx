import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wrench, BarChart3, Settings } from 'lucide-react'

const navItems = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/maintenance', icon: Wrench,           label: 'Maintenance' },
  { to: '/reports',     icon: BarChart3,        label: 'Reports' },
  { to: '/settings',    icon: Settings,         label: 'System Settings' },
]

export default function Sidebar({ expanded, onToggle }) {
  return (
    <aside
      className={`
    flex flex-col h-full overflow-hidden
    bg-light-sidebar dark:bg-dark-sidebar
    border-r border-light-border dark:border-dark-border
    transition-all duration-300 ease-in-out
    ${expanded ? 'w-56' : 'w-16'}
  `}
    >
      {/* Logo / toggle */}
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="flex items-center gap-3 h-14 px-4 shrink-0 hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
      >
        <span className="text-light-accent dark:text-dark-accent font-bold text-xl shrink-0 w-5 text-center">
          H
        </span>
        <span
          className={`font-semibold text-light-primary dark:text-dark-primary whitespace-nowrap transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          Hyperion
        </span>
      </button>

      {/* Divider */}
      <div className="mx-3 border-t border-light-border dark:border-dark-border" />

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
                isActive
                  ? 'bg-light-accent dark:bg-dark-accent text-white'
                  : 'text-light-secondary dark:text-dark-secondary hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt'
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            <span
              className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}