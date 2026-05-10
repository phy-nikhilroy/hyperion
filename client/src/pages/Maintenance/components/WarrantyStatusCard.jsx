import { useEffect, useState } from 'react'
import { Shield } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getWarrantyStatus } from '../../../services/maintenanceService'

const STATUS = {
  valid:    { label: 'Valid',     color: 'text-light-success dark:text-dark-success' },
  expiring: { label: 'Expiring', color: 'text-light-warning dark:text-dark-warning' },
  expired:  { label: 'Expired',  color: 'text-light-danger  dark:text-dark-danger'  },
}

function WarrantyRow({ label, item }) {
  const cfg = STATUS[item.status]
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-light-border dark:border-dark-border last:border-0">
      <div>
        <p className="text-sm font-medium text-light-primary dark:text-dark-primary">{label}</p>
        <p className="text-xs text-light-muted dark:text-dark-muted">Expires {item.expiryDate}</p>
      </div>
      <span className={`text-sm font-medium shrink-0 ${cfg.color}`}>● {cfg.label}</span>
    </div>
  )
}

export default function WarrantyStatusCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getWarrantyStatus().then(setData) }, [])

  if (!data) return (
    <Card title="Warranty Status" icon={Shield}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  return (
    <Card title="Warranty Status" icon={Shield}>
      <WarrantyRow label="Solar Panels" item={data.panels} />
      <WarrantyRow label="Inverter"     item={data.inverter} />
      <WarrantyRow label="Battery"      item={data.battery} />
    </Card>
  )
}
