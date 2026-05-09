import Card from '../../components/ui/Card'
import { Wrench, CalendarCheck, AlertTriangle, ClipboardList } from 'lucide-react'

export default function Maintenance() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-6">
        Maintenance
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card title="Service Status" icon={Wrench}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No pending service.</p>
        </Card>
        <Card title="Next Scheduled" icon={CalendarCheck}>
          <p className="text-sm text-light-muted dark:text-dark-muted">Not scheduled.</p>
        </Card>
        <Card title="Active Alerts" icon={AlertTriangle}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No active alerts.</p>
        </Card>
        <Card title="Service History" icon={ClipboardList}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No records found.</p>
        </Card>
      </div>
    </div>
  )
}
