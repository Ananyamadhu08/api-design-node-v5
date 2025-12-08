import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'
import {
  createHabit,
  deleteHabit,
  getUserHabits,
  updateHabit,
} from '../controllers/habitController.ts'
import { z } from 'zod'
import { validateBody, validateParams } from '../middleware/validation.ts'

const createHabitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  frequency: z.string(),
  targetCount: z.number(),
  tagIds: z.array(z.string()).optional(),
})

const uuidSchema = z.object({
  id: z.uuid('Invalid habit ID format'),
})

const router = Router()

router.use(authenticateToken)

router.get('/', getUserHabits)

router.patch('/:id', validateParams(uuidSchema), updateHabit)

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'got one habit' })
})

router.post('/', validateBody(createHabitSchema), createHabit)

router.delete('/:id', deleteHabit)

router.post('/:id/complete', (req, res) => {
  res.status(201).json({ message: 'completed habit' })
})

export default router
