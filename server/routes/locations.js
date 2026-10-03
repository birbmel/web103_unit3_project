import express from 'express'
import locationsController from '../controllers/locations.js'

const router = express.Router()

router.get('/', locationsController.getLocations)

export default router
