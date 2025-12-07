import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'
import { createHabit } from '../controllers/habitController.ts'

const router = Router()

router.use(authenticateToken)

router.get('/', (req, res) => {
  res.status(200).json({ message: 'got habits' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'got one habit' })
})

router.post('/', createHabit)

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'deleted habit' })
})

router.post('/:id/complete', (req, res) => {
  res.status(201).json({ message: 'completed habit' })
})

export default router
