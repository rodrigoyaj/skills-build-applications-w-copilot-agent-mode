import { Router, Request, Response } from 'express'

const router = Router()

// Get all workouts
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all workouts',
    data: []
  })
})

// Get workout by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Get workout ${id}`,
    workoutId: id
  })
})

// Create workout
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Workout created',
    data: req.body
  })
})

// Update workout
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Workout ${id} updated`,
    data: req.body
  })
})

// Delete workout
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Workout ${id} deleted`
  })
})

export default router
