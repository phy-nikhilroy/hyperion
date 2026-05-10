import { Zap } from 'lucide-react'
import Card from '../../../components/ui/Card'

export default function LiveOutputCard({ live, loading }) {
  const watts = live?.outputW ?? 0
  const online = live?.online ?? false

  const display = watts >= 1000
    ? `${(watts / 1000).toFixed(2)} kW`
    : `${watts} W`

  return (
    <Card title="Live Output" icon={Zap}>
      {loading && !live ? (
        <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
      ) : (
        <>
          <p className={`text-3xl font-bold mb-1 ${online ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`}>
            {online ? display : '—'}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            {online ? 'Current output' : 'Sensor offline'}
          </p>
        </>
      )}
    </Card>
  )
}
