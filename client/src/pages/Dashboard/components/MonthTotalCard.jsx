import { Sun } from 'lucide-react'
import Card from '../../../components/ui/Card'

const CO2_PER_KWH = 0.7 // kg CO2 saved per kWh (India grid factor)

export default function MonthTotalCard({ history, loading }) {
  const currentMonth = new Date().toISOString().slice(0, 7) // 'YYYY-MM'

  const monthKwh = history
    ? history
        .filter(r => r.date.startsWith(currentMonth))
        .reduce((sum, r) => sum + r.totalKwh, 0)
    : 0

  const co2Saved = (monthKwh * CO2_PER_KWH).toFixed(1)

  return (
    <Card title="This Month" icon={Sun}>
      {loading && !history ? (
        <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
      ) : (
        <>
          <p className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-1">
            {monthKwh.toFixed(1)} <span className="text-base font-normal">kWh</span>
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            ≈ {co2Saved} kg CO₂ saved
          </p>
        </>
      )}
    </Card>
  )
}
