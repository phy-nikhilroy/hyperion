import Card from '../../components/ui/Card'
import { Sun, Zap, Battery, Leaf } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card title="Solar Output" icon={Sun}>
          <p className="text-3xl font-bold text-light-primary dark:text-dark-primary">— kW</p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">Current output</p>
        </Card>
        <Card title="Energy Today" icon={Zap}>
          <p className="text-3xl font-bold text-light-primary dark:text-dark-primary">— kWh</p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">Generated today</p>
        </Card>
        <Card title="Battery" icon={Battery}>
          <p className="text-3xl font-bold text-light-primary dark:text-dark-primary">— %</p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">Storage level</p>
        </Card>
        <Card title="CO₂ Saved" icon={Leaf}>
          <p className="text-3xl font-bold text-light-primary dark:text-dark-primary">— kg</p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">This month</p>
        </Card>
      </div>
    </div>
  )
}