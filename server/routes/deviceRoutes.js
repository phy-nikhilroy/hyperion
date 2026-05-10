import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getDevice } from '../controllers/deviceController.js'

const router = Router()

router.use(protect)

router.get('/', getDevice)

export default router
