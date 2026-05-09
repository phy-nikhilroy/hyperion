import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import NotificationsDropdown from '../TopIcons/NotificationsDropdown'
import ProfileDropdown from '../TopIcons/ProfileDropdown'

export default function PageShell() {
  return (
    <div className="flex min-h-screen bg-light-base dark:bg-dark-base">
      <Sidebar />
      <main className="relative flex-1 p-6">
        <div className="absolute top-4 right-4 flex items-center gap-2 z-40">
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
        <Outlet />
      </main>
    </div>
  )
}
