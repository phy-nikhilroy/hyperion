import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import NotificationsDropdown from '../TopIcons/NotificationsDropdown'
import ProfileDropdown from '../TopIcons/ProfileDropdown'
import { useTheme } from '../../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function PageShell() {
  const [expanded, setExpanded] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base">

      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }}>
        <Sidebar expanded={expanded} onToggle={() => setExpanded(prev => !prev)} />
      </div>

      <main style={{ marginLeft: '64px' }} className="flex flex-col min-h-screen overflow-hidden">

        <header className="sticky top-0 z-40 flex items-center justify-end gap-3 px-6 py-3 bg-light-base dark:bg-dark-base border-b border-gray-200 dark:border-gray-800">
          
          {/* Dark/Light mode toggle */}
          <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border bg-light-hover dark:bg-dark-hover hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors">
            {isDark ? <Sun size={15} className="text-amber-400 shrink-0" /> : <Moon size={15} className="text-blue-500 shrink-0" />}
            <span className="text-xs font-medium text-light-primary dark:text-dark-primary hidden sm:inline">
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
          </button>

          <div className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <NotificationsDropdown />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ProfileDropdown />
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 flex flex-col gap-6 px-6 py-6 w-full overflow-hidden">
          <Outlet />
        </div>

      </main>
    </div>
  )
}