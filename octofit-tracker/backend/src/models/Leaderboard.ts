import { Schema, model, Document } from 'mongoose'

export interface ILeaderboard extends Document {
  userId: Schema.Types.ObjectId
  teamId?: Schema.Types.ObjectId
  rank: number
  points: number
  activitiesCount: number
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    rank: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      default: 0
    },
    activitiesCount: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema)
