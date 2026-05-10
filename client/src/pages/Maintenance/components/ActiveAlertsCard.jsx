import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getActiveAlerts } from '../../../services/maintenanceService'

const SEVERITY = {
  critical: { dot: 'bg-light-danger  dark:bg-dark-danger',   text: 'text-light-danger  dark:text-dark-danger'  },
  warning:  { dot: 'bg-light-warning dark:bg-dark-warning',  text: 'text-light-warning dark:text-dark-warning' },
  info:     { dot: 'bg-light-muted   dark:bg-dark-muted',    text: 'text-light-secondary dark:text-dark-secondary' },
}

export default function ActiveAlertsCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getActiveAlerts().then(setData) }, [])

  if (!data) return (
    <Card title="Active Alerts" icon={AlertTriangle}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  return (
    <Card title="Active Alerts" icon={AlertTriangle}>
      {data.alerts.length === 0 ? (
        <div className="py-1">
          <p className="text-sm font-medium text-light-success dark:text-dark-success">● All clear</p>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">No active alerts</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {data.alerts.map(alert => {
            const cfg = SEVERITY[alert.severity]
            return (
              <li key={alert.id} className="flex gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                <div>
                  <p className={`text-sm font-medium ${cfg.text}`}>{alert.message}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">
                    {alert.timestamp}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
