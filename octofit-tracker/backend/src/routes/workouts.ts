import express from 'express'
import type { Request, Response } from 'express'
import { Workout } from '../models/Workout.ts'

const router = express.Router()

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', 'name username').select('-__v')
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      data: workouts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workouts',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const workout = await Workout.findById(id).populate('userId', 'name username').select('-__v')
    if (!workout) {
      res.status(404).json({
        message: `Workout ${id} not found`
      })
      return
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body)
    await workout.save()
    await workout.populate('userId', 'name username')
    res.status(201).json({
      message: 'Workout created',
      data: workout
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error creating workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true })
      .populate('userId', 'name username')
      .select('-__v')
    if (!workout) {
      res.status(404).json({
        message: `Workout ${id} not found`
      })
      return
    }
    res.json({
      message: `Workout ${id} updated`,
      data: workout
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error updating workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const workout = await Workout.findByIdAndDelete(id)
    if (!workout) {
      res.status(404).json({
        message: `Workout ${id} not found`
      })
      return
    }
    res.json({
      message: `Workout ${id} deleted`,
      data: workout
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
