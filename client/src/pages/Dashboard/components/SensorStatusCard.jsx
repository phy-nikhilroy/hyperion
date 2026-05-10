import { Activity } from 'lucide-react'
import Card from '../../../components/ui/Card'

export default function SensorStatusCard({ live, loading }) {
  const online = live?.online ?? false

  const lastSeen = live?.timestamp
    ? new Date(live.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <Card title="Sensor Status" icon={Activity}>
      {loading && !live ? (
        <p className="text-sm text-light-muted dark:text-dark-muted">Checking…</p>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${online ? 'bg-light-success dark:bg-dark-success' : 'bg-light-danger dark:bg-dark-danger'}`} />
            <span className={`text-2xl font-bold ${online ? 'text-light-success dark:text-dark-success' : 'text-light-danger dark:bg-dark-danger'}`}>
              {online ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            {lastSeen ? `Last reading at ${lastSeen}` : 'No readings yet'}
          </p>
        </>
      )}
    </Card>
  )
}
