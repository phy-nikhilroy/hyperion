import { Router } from 'express'
import { ingest } from '../controllers/ingestController.js'

const router = Router()

router.post('/', ingest)

export default router
