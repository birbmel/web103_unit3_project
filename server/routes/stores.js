import express from 'express'
import eventsController from '../controllers/stores.js'

const router = express.Router()

router.get('/', eventsController.getStores)

export default router
