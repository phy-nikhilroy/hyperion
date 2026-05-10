import mongoose from 'mongoose'

const deviceSchema = new mongoose.Schema(
  {
    deviceId:      { type: String, required: true, unique: true },
    name:          { type: String, required: true },
    location:      { type: String, required: true },
    panelCount:    { type: Number, required: true },
    capacityKw:    { type: Number, required: true },
    purchaseDate:  { type: Date, required: true },
    warrantyExpiry:{ type: Date, required: true },
    installer:     { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Device', deviceSchema)
