import SystemHealthCard     from './components/SystemHealthCard'
import PanelConditionCard   from './components/PanelConditionCard'
import InverterStatusCard   from './components/InverterStatusCard'
import BatteryHealthCard    from './components/BatteryHealthCard'
import ActiveAlertsCard     from './components/ActiveAlertsCard'
import ScheduledServiceCard from './components/ScheduledServiceCard'
import ServiceHistoryCard   from './components/ServiceHistoryCard'
import WarrantyStatusCard   from './components/WarrantyStatusCard'

export default function Maintenance() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary">
        Maintenance
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <SystemHealthCard />
        <PanelConditionCard />
        <InverterStatusCard />
        <BatteryHealthCard />
        <ActiveAlertsCard />
        <ScheduledServiceCard />
        <ServiceHistoryCard />
        <WarrantyStatusCard />
      </div>
    </div>
  )
}