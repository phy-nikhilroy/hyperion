import { useEffect, useState } from 'react'
import { ClipboardList } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getServiceHistory } from '../../../services/maintenanceService'

export default function ServiceHistoryCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getServiceHistory().then(setData) }, [])

  if (!data) return (
    <Card title="Service History" icon={ClipboardList}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  return (
    <Card title="Service History" icon={ClipboardList}>
      <ul className="space-y-4">
        {data.records.map(record => (
          <li
            key={record.id}
            className="border-l-2 border-light-border dark:border-dark-border pl-3"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-light-primary dark:text-dark-primary leading-tight">
                {record.type}
              </p>
              <p className="text-xs text-light-muted dark:text-dark-muted shrink-0">{record.date}</p>
            </div>
            <p className="text-xs text-light-secondary dark:text-dark-secondary mt-0.5">
              {record.technician}
            </p>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-1 line-clamp-2">
              {record.notes}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
