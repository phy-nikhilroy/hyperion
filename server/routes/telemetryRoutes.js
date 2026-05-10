import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getLive, getToday, getHistory } from '../controllers/telemetryController.js'

const router = Router()

router.use(protect)

router.get('/live',    getLive)
router.get('/today',   getToday)
router.get('/history', getHistory)

export default router
