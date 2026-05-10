import redis from '../utils/redis.js'
import TelemetryDaily from '../models/TelemetryDaily.js'

async function withCache(key, ttlSeconds, fetchFn) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  const data = await fetchFn()
  await redis.set(key, JSON.stringify(data), 'EX', ttlSeconds)
  return data
}

// GET /api/telemetry/live
// Reads directly from Redis — no MongoDB hit
export const getLive = async (req, res) => {
  try {
    const current = await redis.hgetall('telemetry:current')

    if (!current || !current.outputW) {
      return res.json({ online: false, outputW: 0, timestamp: null })
    }

    res.json({
      online:    true,
      deviceId:  current.deviceId,
      outputW:   Number(current.outputW),
      timestamp: current.timestamp,
    })
  } catch (err) {
    console.error('getLive error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/telemetry/today
// Computes today's running stats from Redis keys
export const getToday = async (req, res) => {
  try {
    const [totalWattSum, sampleCount, peakOutputW, peakAt] = await Promise.all([
      redis.get('telemetry:today:sum'),
      redis.llen('telemetry:today:readings'),
      redis.get('telemetry:today:peak'),
      redis.get('telemetry:today:peakAt'),
    ])

    // kWh = sum(watts) × 30s per reading ÷ 3600s/hr ÷ 1000W/kW
    const totalKwh = totalWattSum
      ? Math.round((Number(totalWattSum) * 30) / 3600000 * 100) / 100
      : 0

    res.json({
      date:        new Date().toISOString().split('T')[0],
      totalKwh,
      peakOutputW: Number(peakOutputW) || 0,
      peakAt:      peakAt || null,
      sampleCount: sampleCount || 0,
    })
  } catch (err) {
    console.error('getToday error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/telemetry/history?days=30
// MongoDB query cached in Redis — cache TTL scales with range
export const getHistory = async (req, res) => {
  try {
    const days = Math.min(Math.max(parseInt(req.query.days) || 30, 1), 365)
    const cacheKey = `cache:history:${days}d`
    const ttl = days <= 30 ? 300 : 1800 // 5 min for short ranges, 30 min for long

    const data = await withCache(cacheKey, ttl, async () => {
      const since = new Date()
      since.setDate(since.getDate() - days)
      const sinceStr = since.toISOString().split('T')[0]

      return TelemetryDaily
        .find({ deviceId: 'panel-01', date: { $gte: sinceStr } })
        .sort({ date: 1 })
        .select('date totalKwh peakOutputW medianDaytimeOutputW sunshineHours -_id')
        .lean()
    })

    res.json({ days, records: data })
  } catch (err) {
    console.error('getHistory error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}
