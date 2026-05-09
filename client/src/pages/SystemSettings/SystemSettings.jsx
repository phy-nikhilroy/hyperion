import Card from '../../components/ui/Card'
import { Settings, Wifi, Shield, Bell } from 'lucide-react'

export default function SystemSettings() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-6">
        System Settings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card title="General" icon={Settings}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No settings configured.</p>
        </Card>
        <Card title="Connectivity" icon={Wifi}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No devices connected.</p>
        </Card>
        <Card title="Security" icon={Shield}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No security settings.</p>
        </Card>
        <Card title="Notifications" icon={Bell}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No notification rules set.</p>
        </Card>
      </div>
    </div>
  )
}
