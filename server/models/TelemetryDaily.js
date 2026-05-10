import mongoose from 'mongoose'

const telemetryDailySchema = new mongoose.Schema(
  {
    deviceId:             { type: String, required: true },
    date:                 { type: String, required: true }, // 'YYYY-MM-DD'
    totalKwh:             { type: Number, required: true },
    peakOutputW:          { type: Number, required: true },
    peakAt:               { type: Date },
    medianDaytimeOutputW: { type: Number, required: true },
    sunshineHours:        { type: Number, required: true },
    sampleCount:          { type: Number, required: true },
  }
)

telemetryDailySchema.index({ deviceId: 1, date: -1 })

export default mongoose.model('TelemetryDaily', telemetryDailySchema)
