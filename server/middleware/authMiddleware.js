import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorised' })

  try {
    const { id } = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    req.user = await User.findById(id).select('-password')
    next()
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}
