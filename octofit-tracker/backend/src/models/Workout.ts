import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  userId: Schema.Types.ObjectId
  name: string
  description?: string
  exercises: Array<{
    name: string
    sets: number
    reps: number
    weight?: number
  }>
  difficulty: string
  duration: number
  points: number
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    exercises: [
      {
        name: {
          type: String,
          required: true
        },
        sets: {
          type: Number,
          required: true
        },
        reps: {
          type: Number,
          required: true
        },
        weight: {
          type: Number
        }
      }
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    duration: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export const Workout = model<IWorkout>('Workout', workoutSchema)
