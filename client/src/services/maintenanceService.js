// All maintenance data fetching lives here.
// Every function is async so swapping mock data for a real fetch is a one-line change per function.
// When API is ready: replace the returned object with fetch('/api/maintenance/...').then(r => r.json())

export const getSystemHealth = async () => ({
  status: 'online',         // 'online' | 'warning' | 'offline'
  uptime: '42 days',
  lastChecked: '2 minutes ago',
})

export const getPanelCondition = async () => ({
  lastCleaned: '2026-02-10',
  daysSinceCleaning: 88,
  recommendedInterval: 90,  // days
  nextCleaning: '2026-08-10',
  condition: 'fair',        // 'good' | 'fair' | 'poor'
})

export const getInverterStatus = async () => ({
  model: 'SolarEdge SE5000H',
  status: 'normal',         // 'normal' | 'warning' | 'fault'
  temperature: 42,          // °C
  uptime: '42 days, 6 hours',
})

export const getBatteryHealth = async () => ({
  capacityRemaining: 91,    // % of original capacity
  cycleCount: 312,
  estimatedLifespan: '7.2 years remaining',
  health: 'good',           // 'good' | 'fair' | 'poor'
})

export const getActiveAlerts = async () => ({
  alerts: [
    {
      id: 1,
      severity: 'warning',  // 'critical' | 'warning' | 'info'
      message: 'Panel output 12% below expected for current weather conditions.',
      timestamp: '3 hours ago',
    },
  ],
})

export const getScheduledService = async () => ({
  nextServiceDate: '2026-08-15',
  daysUntil: 98,
  serviceType: 'Annual Inspection',
  provider: 'SolarCare Services',
})

export const getServiceHistory = async () => ({
  records: [
    {
      id: 1,
      date: '2025-08-12',
      type: 'Annual Inspection',
      technician: 'Rajesh Kumar',
      notes: 'All panels functioning normally. Cleaned and calibrated inverter.',
    },
    {
      id: 2,
      date: '2025-02-20',
      type: 'Panel Cleaning',
      technician: 'Meena Sharma',
      notes: 'Removed heavy dust accumulation. Output improved by 8% post-clean.',
    },
    {
      id: 3,
      date: '2024-08-05',
      type: 'Annual Inspection',
      technician: 'Rajesh Kumar',
      notes: 'Minor inverter firmware update applied. No issues found.',
    },
  ],
})

export const getWarrantyStatus = async () => ({
  panels:   { expiryDate: '2034-06-15', yearsRemaining: 8.1,  status: 'valid' },
  inverter: { expiryDate: '2029-03-22', yearsRemaining: 2.9,  status: 'valid' },
  battery:  { expiryDate: '2027-06-01', yearsRemaining: 1.1,  status: 'expiring' },
})
