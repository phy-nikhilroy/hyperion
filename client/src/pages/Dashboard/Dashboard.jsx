import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../../services/api'
import SensorStatusCard from './components/SensorStatusCard'
import LiveOutputCard   from './components/LiveOutputCard'
import MonthTotalCard   from './components/MonthTotalCard'
import WarrantyCard     from './components/WarrantyCard'
import HistoryChart     from './components/HistoryChart'

const LIVE_POLL_INTERVAL = 10_000 // 10s

export default function Dashboard() {
  const [live,    setLive]    = useState(null)
  const [history, setHistory] = useState(null)
  const [device,  setDevice]  = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchLive = useCallback(async () => {
    const res = await apiFetch('/api/telemetry/live')
    if (res?.ok) setLive(await res.json())
  }, [])

  useEffect(() => {
    async function init() {
      setLoading(true)
      await Promise.all([
        fetchLive(),
        apiFetch('/api/telemetry/history?days=90').then(r => r?.json()).then(d => d && setHistory(d.records)),
        apiFetch('/api/device').then(r => r?.json()).then(d => d && setDevice(d)),
      ])
      setLoading(false)
    }
    init()

    const poll = setInterval(fetchLive, LIVE_POLL_INTERVAL)
    return () => clearInterval(poll)
  }, [fetchLive])

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SensorStatusCard live={live}    loading={loading} />
        <LiveOutputCard   live={live}    loading={loading} />
        <MonthTotalCard   history={history} loading={loading} />
        <WarrantyCard     device={device}   loading={loading} />
        <HistoryChart     history={history} loading={loading} />
      </div>
    </div>
  )
}
