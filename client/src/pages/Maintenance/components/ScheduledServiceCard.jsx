import { useEffect, useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getScheduledService } from '../../../services/maintenanceService'

export default function ScheduledServiceCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getScheduledService().then(setData) }, [])

  if (!data) return (
    <Card title="Next Service" icon={CalendarCheck}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  const urgent = data.daysUntil <= 14

  return (
    <Card title="Next Service" icon={CalendarCheck}>
      <div className="mb-4">
        <span className={`text-3xl font-bold ${urgent ? 'text-light-warning dark:text-dark-warning' : 'text-light-primary dark:text-dark-primary'}`}>
          {data.daysUntil}
        </span>
        <span className="text-sm text-light-muted dark:text-dark-muted ml-1">days away</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-light-primary dark:text-dark-primary">
          {data.serviceType}
        </p>
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          {data.provider}
        </p>
        <p className="text-xs text-light-muted dark:text-dark-muted">{data.nextServiceDate}</p>
      </div>
    </Card>
  )
}
