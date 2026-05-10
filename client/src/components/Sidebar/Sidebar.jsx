import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wrench, BarChart3, Settings, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/maintenance',  icon: Wrench,           label: 'Maintenance' },
  { to: '/reports',      icon: BarChart3,        label: 'Reports' },
  { to: '/settings',     icon: Settings,         label: 'System Settings' },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <aside
      className={`
        flex flex-col h-screen sticky top-0 shrink-0 overflow-hidden
        bg-light-sidebar dark:bg-dark-sidebar
        border-r border-light-border dark:border-dark-border
        transition-all duration-300 ease-in-out
        ${expanded ? 'w-56' : 'w-16'}
      `}
    >
      {/* Logo / toggle */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        aria-label="Toggle sidebar"
        className="flex items-center h-14 w-full shrink-0 hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
      >
        <span className="w-16 shrink-0 flex items-center justify-center text-light-accent dark:text-dark-accent font-bold text-xl">
          H
        </span>
        <span className={`font-semibold text-light-primary dark:text-dark-primary whitespace-nowrap transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
          Hyperion
        </span>
      </button>

      {/* Divider */}
      <div className="mx-3 border-t border-light-border dark:border-dark-border" />

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-light-accent dark:bg-dark-accent text-white'
                  : 'text-light-secondary dark:text-dark-secondary hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt'
              }`
            }
          >
            <span className="w-12 py-2 shrink-0 flex items-center justify-center">
              <Icon size={20} />
            </span>
            <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="pb-4">
        <div className="mx-3 mb-2 border-t border-light-border dark:border-dark-border" />
        <button
          onClick={toggleTheme}
          className="flex items-center w-full mx-0 rounded-lg text-light-secondary dark:text-dark-secondary hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
        >
          <span className="w-16 py-2 shrink-0 flex items-center justify-center">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>
  )
}
