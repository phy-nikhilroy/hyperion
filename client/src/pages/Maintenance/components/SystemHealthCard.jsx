import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getSystemHealth } from '../../../services/maintenanceService'

const STATUS = {
  online:  { label: 'Online',    color: 'text-light-success dark:text-dark-success' },
  warning: { label: 'Attention', color: 'text-light-warning dark:text-dark-warning' },
  offline: { label: 'Offline',   color: 'text-light-danger  dark:text-dark-danger'  },
}

export default function SystemHealthCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getSystemHealth().then(setData) }, [])

  if (!data) return (
    <Card title="System Health" icon={Activity}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  const cfg = STATUS[data.status]
  return (
    <Card title="System Health" icon={Activity}>
      <div className={`flex items-center gap-2 mb-4 ${cfg.color}`}>
        <span className="text-xl leading-none">●</span>
        <span className="text-2xl font-bold">{cfg.label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          Uptime:{' '}
          <span className="font-medium text-light-primary dark:text-dark-primary">
            {data.uptime}
          </span>
        </p>
        <p className="text-xs text-light-muted dark:text-dark-muted">
          Last checked {data.lastChecked}
        </p>
      </div>
    </Card>
  )
}
