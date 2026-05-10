import { ShieldCheck } from 'lucide-react'
import Card from '../../../components/ui/Card'

export default function WarrantyCard({ device, loading }) {
  const expiry = device?.warrantyExpiry ? new Date(device.warrantyExpiry) : null
  const today = new Date()
  const daysLeft = expiry ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)) : null

  const status =
    daysLeft === null ? null
    : daysLeft > 365   ? 'valid'
    : daysLeft > 0     ? 'expiring'
    : 'expired'

  const statusColor = {
    valid:    'text-light-success dark:text-dark-success',
    expiring: 'text-light-warning dark:text-dark-warning',
    expired:  'text-light-danger dark:text-dark-danger',
  }

  return (
    <Card title="Warranty" icon={ShieldCheck}>
      {loading && !device ? (
        <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
      ) : !device ? (
        <p className="text-sm text-light-muted dark:text-dark-muted">No device data</p>
      ) : (
        <>
          <p className={`text-2xl font-bold mb-1 ${statusColor[status]}`}>
            {status === 'expired'
              ? 'Expired'
              : `${daysLeft.toLocaleString()} days`}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            {status === 'expired'
              ? `Expired ${expiry.toLocaleDateString()}`
              : `Valid until ${expiry.toLocaleDateString()}`}
          </p>
          <div className="mt-3 pt-3 border-t border-light-border dark:border-dark-border space-y-1">
            <p className="text-xs text-light-secondary dark:text-dark-secondary">
              {device.panelCount} panels · {device.capacityKw} kW capacity
            </p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">
              {device.location}
            </p>
          </div>
        </>
      )}
    </Card>
  )
}
