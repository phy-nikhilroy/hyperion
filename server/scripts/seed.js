/**
 * One-time seed script. Run once against Atlas to populate:
 *   - 1 device document
 *   - 1 user account (your login)
 *   - 730 days of synthetic daily telemetry (2 years of history)
 *
 * Usage:  node server/scripts/seed.js
 * Run from the repo root.
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') })
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Device from '../models/Device.js'
import TelemetryDaily from '../models/TelemetryDaily.js'

// ─── Config — edit these before running ──────────────────────────────────────

const SEED_USER = {
  name:     'Admin User',           // update before running
  email:    'admin@example.com',    // update before running
  password: 'changeme123',          // update before running
}

const SEED_DEVICE = {
  deviceId:       'panel-01',
  name:           'Home Solar System',
  location:       'Your City, Country',  // update before running
  panelCount:     10,
  capacityKw:     5.0,
  purchaseDate:   new Date('2024-01-15'),
  warrantyExpiry: new Date('2034-01-15'),
  installer:      'Your Installer Name', // update before running
}

// ─── Synthetic telemetry generation ──────────────────────────────────────────

function generateDailyRecord(deviceId, dateStr) {
  const date = new Date(dateStr)

  // Day of year (0–364) — used to compute seasonal variation
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000)

  // Seasonal sine curve: peaks ~June 21 (day 172) for North India
  // Shifts sine so peak aligns with summer solstice
  const seasonalFactor = 0.5 + 0.5 * Math.sin((2 * Math.PI * (dayOfYear - 80)) / 365)

  // Base production: 2.0 kWh (winter) to 6.0 kWh (summer)
  const baseKwh = 2.0 + seasonalFactor * 4.0

  // Day-to-day randomness ±20%
  const dailyNoise = 0.8 + Math.random() * 0.4

  // Cloudy day — 18% chance of a significant dip
  const cloudyFactor = Math.random() < 0.18 ? 0.3 + Math.random() * 0.3 : 1.0

  const totalKwh = Math.round(baseKwh * dailyNoise * cloudyFactor * 100) / 100

  // Sunshine hours correlates with production (4–9.5 hrs)
  const sunshineHours = Math.round((3.5 + seasonalFactor * 6.0) * cloudyFactor * 10) / 10

  // Peak output — roughly totalKwh / sunshineHours * 1.6 (bell curve peak)
  const peakOutputW = Math.round((totalKwh / Math.max(sunshineHours, 0.5)) * 1600)

  // Median daytime output — slightly below peak (right-skewed bell curve during day)
  const medianDaytimeOutputW = Math.round(peakOutputW * (0.55 + Math.random() * 0.1))

  // Peak time — typically late morning to early afternoon
  const peakHour = 10 + Math.floor(Math.random() * 4)
  const peakAt = new Date(dateStr)
  peakAt.setHours(peakHour, Math.floor(Math.random() * 60), 0, 0)

  // Sample count — one per 30s during sunshine hours
  const sampleCount = Math.round(sunshineHours * 120)

  return {
    deviceId,
    date: dateStr,
    totalKwh,
    peakOutputW,
    peakAt,
    medianDaytimeOutputW,
    sunshineHours,
    sampleCount,
  }
}

function dateRange(startDate, endDate) {
  const dates = []
  const cur = new Date(startDate)
  const end = new Date(endDate)
  while (cur <= end) {
    dates.push(cur.toISOString().split('T')[0])
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Connecting to MongoDB Atlas…')
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected.\n')

  // ── User ──
  const existingUser = await User.findOne({ email: SEED_USER.email })
  if (existingUser) {
    console.log('User already exists — skipping.')
  } else {
    await User.create(SEED_USER)
    console.log(`User created: ${SEED_USER.email}`)
  }

  // ── Device ──
  await Device.findOneAndUpdate(
    { deviceId: SEED_DEVICE.deviceId },
    SEED_DEVICE,
    { upsert: true, new: true }
  )
  console.log(`Device upserted: ${SEED_DEVICE.deviceId}`)

  // ── 2 years of daily telemetry ──
  const today = new Date()
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() - 1) // up to yesterday

  const startDate = new Date(endDate)
  startDate.setFullYear(startDate.getFullYear() - 2)

  const dates = dateRange(startDate, endDate)
  console.log(`\nGenerating ${dates.length} days of telemetry (${dates[0]} → ${dates[dates.length - 1]})…`)

  const records = dates.map(d => generateDailyRecord(SEED_DEVICE.deviceId, d))

  // Bulk upsert — safe to re-run
  const ops = records.map(r => ({
    updateOne: {
      filter: { deviceId: r.deviceId, date: r.date },
      update: { $set: r },
      upsert: true,
    },
  }))

  const result = await TelemetryDaily.bulkWrite(ops)
  console.log(`Telemetry: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`)

  console.log('\nSeed complete.')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
