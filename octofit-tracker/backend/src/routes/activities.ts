import { Router, Request, Response } from 'express'

const router = Router()

// Get all activities
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all activities',
    data: []
  })
})

// Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Get activity ${id}`,
    activityId: id
  })
})

// Create activity
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Activity created',
    data: req.body
  })
})

// Update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Activity ${id} updated`,
    data: req.body
  })
})

// Delete activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Activity ${id} deleted`
  })
})

export default router
