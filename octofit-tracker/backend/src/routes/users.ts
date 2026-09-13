import { Router, Request, Response } from 'express'
import { User } from '../models/User.js'

const router = Router()

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-__v')
    res.json({
      message: 'Get all users',
      count: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-__v')
    if (!user) {
      res.status(404).json({
        message: `User ${id} not found`
      })
      return
    }
    res.json({
      message: `Get user ${id}`,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({
      message: 'User created',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-__v')
    if (!user) {
      res.status(404).json({
        message: `User ${id} not found`
      })
      return
    }
    res.json({
      message: `User ${id} updated`,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      res.status(404).json({
        message: `User ${id} not found`
      })
      return
    }
    res.json({
      message: `User ${id} deleted`,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
