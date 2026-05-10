import cron from 'node-cron'
import redis from '../utils/redis.js'
import TelemetryDaily from '../models/TelemetryDaily.js'

const KEY_READINGS = 'telemetry:today:readings'
const KEY_SUM      = 'telemetry:today:sum'
const KEY_PEAK     = 'telemetry:today:peak'
const KEY_PEAK_AT  = 'telemetry:today:peakAt'

function median(sortedArr) {
  const mid = Math.floor(sortedArr.length / 2)
  return sortedArr.length % 2 !== 0
    ? sortedArr[mid]
    : (sortedArr[mid - 1] + sortedArr[mid]) / 2
}

export async function runAggregation() {
  try {
    // Yesterday's date string
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const date = yesterday.toISOString().split('T')[0]

    const [rawReadings, totalWattSum, peakOutputW, peakAt] = await Promise.all([
      redis.lrange(KEY_READINGS, 0, -1),
      redis.get(KEY_SUM),
      redis.get(KEY_PEAK),
      redis.get(KEY_PEAK_AT),
    ])

    if (!rawReadings.length) {
      console.log(`[aggregation] No readings for ${date} — skipping.`)
      return
    }

    const readings = rawReadings.map(Number)

    // Median of daytime readings only (where panels are actively producing)
    const daytime = readings.filter(w => w > 50).sort((a, b) => a - b)
    const medianDaytimeOutputW = daytime.length ? Math.round(median(daytime)) : 0

    // kWh = sum of (watts × 30s interval) converted to watt-hours then kWh
    const totalKwh = Math.round((Number(totalWattSum) * 30) / 3600000 * 100) / 100

    // Sunshine hours = active readings × 30s per reading
    const sunshineHours = Math.round((daytime.length * 30) / 3600 * 10) / 10

    const doc = {
      deviceId:             'panel-01',
      date,
      totalKwh,
      peakOutputW:          Number(peakOutputW) || 0,
      peakAt:               peakAt ? new Date(peakAt) : null,
      medianDaytimeOutputW,
      sunshineHours,
      sampleCount:          readings.length,
    }

    await TelemetryDaily.findOneAndUpdate(
      { deviceId: doc.deviceId, date },
      { $set: doc },
      { upsert: true }
    )

    // Reset daily Redis keys for the new day
    await redis.del(KEY_READINGS, KEY_SUM, KEY_PEAK, KEY_PEAK_AT)

    console.log(`[aggregation] ${date} written — ${totalKwh} kWh, peak ${peakOutputW}W`)
  } catch (err) {
    console.error('[aggregation] Failed:', err.message)
  }
}

// Runs at 00:01 every day
export function startAggregationJob() {
  cron.schedule('1 0 * * *', runAggregation)
  console.log('Aggregation cron scheduled (00:01 daily)')
}
