import { Schema, model, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description?: string
  logo?: string
  members: Schema.Types.ObjectId[]
  totalPoints: number
  createdBy: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    logo: {
      type: String
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    totalPoints: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Team = model<ITeam>('Team', teamSchema)
