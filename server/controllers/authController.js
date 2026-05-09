import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields required' })

    if (await User.findOne({ email }))
      return res.status(409).json({ message: 'Email already in use' })

    const user = await User.create({ name, email, password })
    const token = signToken(user._id)
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' })

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = signToken(user._id)
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}
