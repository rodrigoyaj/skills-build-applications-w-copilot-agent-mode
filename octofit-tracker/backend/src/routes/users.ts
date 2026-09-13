import { Router, Request, Response } from 'express'

const router = Router()

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: []
  })
})

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Get user ${id}`,
    userId: id
  })
})

// Create user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'User created',
    data: req.body
  })
})

// Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `User ${id} updated`,
    data: req.body
  })
})

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `User ${id} deleted`
  })
})

export default router
