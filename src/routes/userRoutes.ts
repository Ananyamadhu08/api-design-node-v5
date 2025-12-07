import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()

router.use(authenticateToken)

router.get('/', (req, res) => {
  res.status(200).json({ message: 'got users' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'got user' })
})

router.put('/:id', (req, res) => {
  res.status(201).json({ message: 'updated user' })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'deleted user' })
})

export default router
