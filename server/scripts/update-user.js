/**
 * Interactively update the seeded user's name and password.
 * Usage:  node server/scripts/update-user.js
 * Run from the repo root.
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') })
import mongoose from 'mongoose'
import readline from 'readline'
import User from '../models/User.js'

function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve))
}

async function run() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  const currentEmail = await prompt(rl, 'Current email of user to update: ')
  const newEmail     = await prompt(rl, 'New email (leave blank to keep current): ')
  const name         = await prompt(rl, 'New display name: ')
  const password     = await prompt(rl, 'New password: ')
  rl.close()

  if (!currentEmail || !name || !password) {
    console.error('Current email, name, and password are required.')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)

  const user = await User.findOne({ email: currentEmail })
  if (!user) {
    console.error(`No user found with email: ${currentEmail}`)
    await mongoose.disconnect()
    process.exit(1)
  }

  user.name = name
  user.password = password  // pre-save hook will bcrypt this
  if (newEmail.trim()) user.email = newEmail.trim().toLowerCase()
  await user.save()

  console.log(`Updated user: ${user.email} (${user.name})`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
