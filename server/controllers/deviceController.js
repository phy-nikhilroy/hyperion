import redis from '../utils/redis.js'
import Device from '../models/Device.js'

// GET /api/device
// MongoDB query cached for 1 hour — device info almost never changes
export const getDevice = async (req, res) => {
  try {
    const cacheKey = 'cache:device'
    const cached = await redis.get(cacheKey)
    if (cached) return res.json(JSON.parse(cached))

    const device = await Device.findOne({ deviceId: 'panel-01' }).lean()
    if (!device) return res.status(404).json({ message: 'Device not found' })

    await redis.set(cacheKey, JSON.stringify(device), 'EX', 3600)
    res.json(device)
  } catch (err) {
    console.error('getDevice error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}
