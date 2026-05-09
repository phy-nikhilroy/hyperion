import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Notifications"
        className="p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt transition-colors"
      >
        <Bell size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-72 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-md z-50 p-4">
          <p className="text-sm font-semibold text-light-primary dark:text-dark-primary mb-3">
            Notifications
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            No new notifications.
          </p>
        </div>
      )}
    </div>
  )
}
