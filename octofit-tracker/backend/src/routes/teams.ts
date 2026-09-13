import { Router, Request, Response } from 'express'
import { Team } from '../models/Team.js'

const router = Router()

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('createdBy', 'name username').populate('members', 'name username').select('-__v')
    res.json({
      message: 'Get all teams',
      count: teams.length,
      data: teams
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching teams',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await Team.findById(id).populate('createdBy', 'name username').populate('members', 'name username').select('-__v')
    if (!team) {
      res.status(404).json({
        message: `Team ${id} not found`
      })
      return
    }
    res.json({
      message: `Get team ${id}`,
      data: team
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body)
    await team.save()
    await team.populate('createdBy', 'name username').populate('members', 'name username')
    res.status(201).json({
      message: 'Team created',
      data: team
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error creating team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true })
      .populate('createdBy', 'name username')
      .populate('members', 'name username')
      .select('-__v')
    if (!team) {
      res.status(404).json({
        message: `Team ${id} not found`
      })
      return
    }
    res.json({
      message: `Team ${id} updated`,
      data: team
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error updating team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await Team.findByIdAndDelete(id)
    if (!team) {
      res.status(404).json({
        message: `Team ${id} not found`
      })
      return
    }
    res.json({
      message: `Team ${id} deleted`,
      data: team
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
