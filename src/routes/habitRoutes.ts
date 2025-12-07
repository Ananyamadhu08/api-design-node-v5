import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'
import { createHabit } from '../controllers/habitController.ts'
import { z } from 'zod'
import { validateBody } from '../middleware/validation.ts'

const createHabitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  frequency: z.string(),
  targetCount: z.number(),
  tagIds: z.array(z.string()).optional(),
})

const router = Router()

router.use(authenticateToken)

router.get('/', (req, res) => {
  res.status(200).json({ message: 'got habits' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'got one habit' })
})

router.post('/', validateBody(createHabitSchema), createHabit)

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'deleted habit' })
})

router.post('/:id/complete', (req, res) => {
  res.status(201).json({ message: 'completed habit' })
})

export default router
