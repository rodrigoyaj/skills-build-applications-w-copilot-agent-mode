import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  username: string
  profilePicture?: string
  bio?: string
  totalPoints: number
  teamId?: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    profilePicture: {
      type: String
    },
    bio: {
      type: String
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  },
  {
    timestamps: true
  }
)

export const User = model<IUser>('User', userSchema)
