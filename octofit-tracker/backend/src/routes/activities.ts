import { Router, Request, Response } from 'express'
import { Activity } from '../models/Activity.js'

const router = Router()

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'name username').select('-__v')
    res.json({
      message: 'Get all activities',
      count: activities.length,
      data: activities
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activities',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const activity = await Activity.findById(id).populate('userId', 'name username').select('-__v')
    if (!activity) {
      res.status(404).json({
        message: `Activity ${id} not found`
      })
      return
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body)
    await activity.save()
    await activity.populate('userId', 'name username')
    res.status(201).json({
      message: 'Activity created',
      data: activity
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error creating activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true })
      .populate('userId', 'name username')
      .select('-__v')
    if (!activity) {
      res.status(404).json({
        message: `Activity ${id} not found`
      })
      return
    }
    res.json({
      message: `Activity ${id} updated`,
      data: activity
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error updating activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const activity = await Activity.findByIdAndDelete(id)
    if (!activity) {
      res.status(404).json({
        message: `Activity ${id} not found`
      })
      return
    }
    res.json({
      message: `Activity ${id} deleted`,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
