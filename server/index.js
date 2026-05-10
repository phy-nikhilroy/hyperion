import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import connectDB from './utils/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') })
connectDB()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Hyperion server running on port ${PORT}`))
