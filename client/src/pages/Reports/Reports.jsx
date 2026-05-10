import Card from '../../components/ui/Card'
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react'

export default function Reports() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary">
        Reports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card title="Monthly Output" icon={BarChart3}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No data available.</p>
        </Card>
        <Card title="Performance Trend" icon={TrendingUp}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No data available.</p>
        </Card>
        <Card title="Export Report" icon={Download}>
          <p className="text-sm text-light-muted dark:text-dark-muted">No reports to export.</p>
        </Card>
        <Card title="Date Range" icon={Calendar}>
          <p className="text-sm text-light-muted dark:text-dark-muted">Select a range to filter.</p>
        </Card>
      </div>
    </div>
  )
}