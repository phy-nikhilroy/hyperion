import redis from '../utils/redis.js'

// Keys
const KEY_CURRENT  = 'telemetry:current'
const KEY_READINGS = 'telemetry:today:readings'
const KEY_SUM      = 'telemetry:today:sum'
const KEY_PEAK     = 'telemetry:today:peak'
const KEY_PEAK_AT  = 'telemetry:today:peakAt'

export const ingest = async (req, res) => {
  const secret = req.headers['x-ingest-secret'] || req.body.secret
  const { deviceId, outputW, timestamp } = req.body

  if (secret !== process.env.INGEST_SECRET)
    return res.status(401).json({ message: 'Unauthorized' })

  if (!deviceId || outputW == null || !timestamp)
    return res.status(400).json({ message: 'deviceId, outputW, and timestamp required' })

  const watts = Number(outputW)
  if (isNaN(watts) || watts < 0)
    return res.status(400).json({ message: 'outputW must be a non-negative number' })

  try {
    // 1. Update live state — expires after 90s so a dead sensor is detectable
    await redis.hset(KEY_CURRENT, { deviceId, outputW: watts, timestamp })
    await redis.expire(KEY_CURRENT, 90)

    // 2. Append to today's rolling readings list (capped at one full day at 30s intervals)
    await redis.rpush(KEY_READINGS, watts)
    await redis.ltrim(KEY_READINGS, -2880, -1)

    // 3. Running watt sum for today's kWh calculation
    await redis.incrbyfloat(KEY_SUM, watts)

    // 4. Track today's peak
    const currentPeak = await redis.get(KEY_PEAK)
    if (currentPeak === null || watts > Number(currentPeak)) {
      await redis.set(KEY_PEAK, watts)
      await redis.set(KEY_PEAK_AT, timestamp)
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Ingest error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}
