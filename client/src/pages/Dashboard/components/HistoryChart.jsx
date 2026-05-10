import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ReferenceLine, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { useTheme } from '../../../context/ThemeContext'
import Card from '../../../components/ui/Card'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-light-primary dark:text-dark-primary mb-1">{formatDate(label)}</p>
      <p className="text-light-secondary dark:text-dark-secondary">{payload[0].value.toFixed(2)} kWh</p>
    </div>
  )
}

export default function HistoryChart({ history, loading }) {
  const { isDark } = useTheme()

  const accentColor = isDark ? '#fbbf24' : '#f59e0b'
  const mutedColor  = isDark ? '#52525b' : '#94a3b8'
  const gridColor   = isDark ? '#27272a' : '#e2e8f0'
  const textColor   = isDark ? '#a1a1aa' : '#475569'

  // Split: last 30 days for bars, full 90 days for average reference
  const last30  = history ? history.slice(-30) : []
  const avg3mo  = history?.length
    ? Math.round(history.reduce((s, r) => s + r.totalKwh, 0) / history.length * 100) / 100
    : null

  return (
    <Card title="Daily Output — Last 30 Days" className="col-span-full">
      {loading && !history ? (
        <div className="h-52 flex items-center justify-center">
          <p className="text-sm text-light-muted dark:text-dark-muted">Loading…</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-4 text-xs text-light-muted dark:text-dark-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: accentColor }} />
              Daily kWh
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 border-t-2 border-dashed" style={{ borderColor: mutedColor }} />
              3-month avg ({avg3mo} kWh)
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={last30} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: textColor }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 11, fill: textColor }}
                tickLine={false}
                axisLine={false}
                unit=" kWh"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: gridColor }} />
              {avg3mo !== null && (
                <ReferenceLine
                  y={avg3mo}
                  stroke={mutedColor}
                  strokeDasharray="6 3"
                  strokeWidth={1.5}
                />
              )}
              <Bar dataKey="totalKwh" fill={accentColor} radius={[2, 2, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  )
}
