import { Router, Request, Response } from 'express'

const router = Router()

// Get all teams
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all teams',
    data: []
  })
})

// Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Get team ${id}`,
    teamId: id
  })
})

// Create team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Team created',
    data: req.body
  })
})

// Update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Team ${id} updated`,
    data: req.body
  })
})

// Delete team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Team ${id} deleted`
  })
})

export default router
