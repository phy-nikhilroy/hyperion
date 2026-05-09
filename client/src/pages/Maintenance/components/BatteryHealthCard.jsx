import { useEffect, useState } from 'react'
import { Battery } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getBatteryHealth } from '../../../services/maintenanceService'

const HEALTH = {
  good: { label: 'Good', color: 'text-light-success dark:text-dark-success' },
  fair: { label: 'Fair', color: 'text-light-warning dark:text-dark-warning' },
  poor: { label: 'Poor', color: 'text-light-danger  dark:text-dark-danger'  },
}

export default function BatteryHealthCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getBatteryHealth().then(setData) }, [])

  if (!data) return (
    <Card title="Battery Health" icon={Battery}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  const cfg = HEALTH[data.health]
  return (
    <Card title="Battery Health" icon={Battery}>
      <div className="flex items-end gap-1 mb-1">
        <span className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          {data.capacityRemaining}%
        </span>
        <span className="text-sm text-light-muted dark:text-dark-muted mb-1">capacity</span>
      </div>
      <div className={`flex items-center gap-1 mb-4 text-sm font-medium ${cfg.color}`}>
        <span className="leading-none">●</span>
        <span>{cfg.label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          {data.cycleCount} charge cycles completed
        </p>
        <p className="text-xs text-light-muted dark:text-dark-muted">
          {data.estimatedLifespan}
        </p>
      </div>
    </Card>
  )
}
