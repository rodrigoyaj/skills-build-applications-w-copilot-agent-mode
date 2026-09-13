import { Router, Request, Response } from 'express'

const router = Router()

// Get leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get leaderboard',
    data: []
  })
})

// Get team leaderboard
router.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params
  res.json({
    message: `Get team ${teamId} leaderboard`,
    teamId
  })
})

// Update leaderboard entry
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    message: `Leaderboard entry ${id} updated`,
    data: req.body
  })
})

export default router
