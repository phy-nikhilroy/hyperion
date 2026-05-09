import { useState, useRef, useEffect } from 'react'
import { UserCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Profile"
        className="p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
      >
        <UserCircle size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-56 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-md z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
            <p className="text-sm font-semibold text-light-primary dark:text-dark-primary">
              {user?.name || 'Account'}
            </p>
            <p className="text-xs text-light-muted dark:text-dark-muted truncate">
              {user?.email || ''}
            </p>
          </div>
          <div className="p-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-light-danger dark:text-dark-danger hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
