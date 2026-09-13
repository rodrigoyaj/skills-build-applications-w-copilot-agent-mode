import express from 'express'
import type { Request, Response } from 'express'
import { Leaderboard } from '../models/Leaderboard.ts'

const router = express.Router()

// Get leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId', 'name username').populate('teamId', 'name').select('-__v')
    res.json({
      message: 'Get leaderboard',
      count: leaderboard.length,
      data: leaderboard
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params
    const leaderboard = await Leaderboard.find({ teamId }).sort({ rank: 1 }).populate('userId', 'name username').populate('teamId', 'name').select('-__v')
    res.json({
      message: `Get team ${teamId} leaderboard`,
      count: leaderboard.length,
      teamId,
      data: leaderboard
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching team leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const entry = await Leaderboard.findByIdAndUpdate(id, req.body, { new: true })
      .populate('userId', 'name username')
      .populate('teamId', 'name')
      .select('-__v')
    if (!entry) {
      res.status(404).json({
        message: `Leaderboard entry ${id} not found`
      })
      return
    }
    res.json({
      message: `Leaderboard entry ${id} updated`,
      data: entry
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error updating leaderboard entry',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
