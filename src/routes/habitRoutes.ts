import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'got habits' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'got one habit' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'created habit' })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'deleted habit' })
})

router.post('/:id/complete', (req, res) => {
  res.status(201).json({ message: 'completed habit' })
})

export default router
