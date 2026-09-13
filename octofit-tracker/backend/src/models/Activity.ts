import { Schema, model, Document } from 'mongoose'

export interface IActivity extends Document {
  userId: Schema.Types.ObjectId
  type: string
  title: string
  description?: string
  duration: number
  distance?: number
  calories?: number
  points: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'gym', 'hiking', 'yoga', 'walking', 'other']
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number,
      required: true
    },
    distance: {
      type: Number
    },
    calories: {
      type: Number
    },
    points: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export const Activity = model<IActivity>('Activity', activitySchema)
