import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import connectDB from './utils/db.js'
import redis from './utils/redis.js'
import authRoutes from './routes/authRoutes.js'
import ingestRoutes from './routes/ingestRoutes.js'
import { startAggregationJob } from './jobs/aggregation.js'

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') })
connectDB()
redis.connect()
startAggregationJob()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/ingest', ingestRoutes)
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Hyperion server running on port ${PORT}`))
