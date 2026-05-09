import { useEffect, useState } from 'react'
import { Sun } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getPanelCondition } from '../../../services/maintenanceService'

const CONDITION = {
  good: { label: 'Good', color: 'text-light-success dark:text-dark-success' },
  fair: { label: 'Fair', color: 'text-light-warning dark:text-dark-warning' },
  poor: { label: 'Poor', color: 'text-light-danger  dark:text-dark-danger'  },
}

export default function PanelConditionCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getPanelCondition().then(setData) }, [])

  if (!data) return (
    <Card title="Panel Condition" icon={Sun}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  const cfg = CONDITION[data.condition]
  const overdue = data.daysSinceCleaning >= data.recommendedInterval

  return (
    <Card title="Panel Condition" icon={Sun}>
      <div className={`flex items-center gap-2 mb-4 ${cfg.color}`}>
        <span className="leading-none">●</span>
        <span className="text-base font-semibold">{cfg.label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          Last cleaned:{' '}
          <span className="font-medium text-light-primary dark:text-dark-primary">
            {data.lastCleaned}
          </span>
        </p>
        <p className={`text-sm font-medium ${overdue ? 'text-light-warning dark:text-dark-warning' : 'text-light-secondary dark:text-dark-secondary'}`}>
          {data.daysSinceCleaning} days since last clean
          {overdue && ' — cleaning due'}
        </p>
        <p className="text-xs text-light-muted dark:text-dark-muted">
          Next recommended: {data.nextCleaning}
        </p>
      </div>
    </Card>
  )
}
