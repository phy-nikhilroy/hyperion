import { useEffect, useState } from 'react'
import { Cpu, Thermometer } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { getInverterStatus } from '../../../services/maintenanceService'

const STATUS = {
  normal:  { label: 'Normal',  color: 'text-light-success dark:text-dark-success' },
  warning: { label: 'Warning', color: 'text-light-warning dark:text-dark-warning' },
  fault:   { label: 'Fault',   color: 'text-light-danger  dark:text-dark-danger'  },
}

export default function InverterStatusCard() {
  const [data, setData] = useState(null)
  useEffect(() => { getInverterStatus().then(setData) }, [])

  if (!data) return (
    <Card title="Inverter Status" icon={Cpu}>
      <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
    </Card>
  )

  const cfg = STATUS[data.status]
  return (
    <Card title="Inverter Status" icon={Cpu}>
      <div className={`flex items-center gap-2 mb-4 ${cfg.color}`}>
        <span className="leading-none">●</span>
        <span className="text-base font-semibold">{cfg.label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-light-primary dark:text-dark-primary">
          {data.model}
        </p>
        <p className="text-sm text-light-secondary dark:text-dark-secondary flex items-center gap-1">
          <Thermometer size={14} className="shrink-0" />
          {data.temperature}°C operating temp
        </p>
        <p className="text-xs text-light-muted dark:text-dark-muted">
          Uptime: {data.uptime}
        </p>
      </div>
    </Card>
  )
}
