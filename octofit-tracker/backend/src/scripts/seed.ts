import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User.ts'
import { Team } from '../models/Team.ts'
import { Activity } from '../models/Activity.ts'
import { Leaderboard } from '../models/Leaderboard.ts'
import { Workout } from '../models/Workout.ts'

dotenv.config()

/**
 * Seed the octofit_db database with test data
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing collections
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Leaderboard.deleteMany({})
    await Workout.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Create users
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@octofit.com',
        username: 'alice_fit',
        bio: 'Marathon runner and fitness enthusiast',
        totalPoints: 850
      },
      {
        name: 'Bob Smith',
        email: 'bob@octofit.com',
        username: 'bob_gains',
        bio: 'Gym rat and bodybuilder',
        totalPoints: 720
      },
      {
        name: 'Carol White',
        email: 'carol@octofit.com',
        username: 'carol_yoga',
        bio: 'Yoga instructor and wellness coach',
        totalPoints: 650
      },
      {
        name: 'David Brown',
        email: 'david@octofit.com',
        username: 'david_swimmer',
        bio: 'Competitive swimmer',
        totalPoints: 920
      },
      {
        name: 'Emma Davis',
        email: 'emma@octofit.com',
        username: 'emma_cyclist',
        bio: 'Road bike enthusiast',
        totalPoints: 780
      }
    ])
    console.log(`👥 Created ${users.length} users`)

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Octopus Runners',
        description: 'The fastest running team in town',
        createdBy: users[0]._id,
        members: [users[0]._id, users[3]._id],
        totalPoints: 1770
      },
      {
        name: 'Iron Squad',
        description: 'Dedicated gym and strength training team',
        createdBy: users[1]._id,
        members: [users[1]._id, users[4]._id],
        totalPoints: 1500
      },
      {
        name: 'Zen Warriors',
        description: 'Holistic fitness and wellness team',
        createdBy: users[2]._id,
        members: [users[2]._id],
        totalPoints: 650
      }
    ])
    console.log(`🏆 Created ${teams.length} teams`)

    // Create activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        title: 'Morning 5K Run',
        description: 'Fast-paced morning run through the park',
        duration: 30,
        distance: 5.0,
        calories: 350,
        points: 150,
        date: new Date('2026-09-12T07:00:00')
      },
      {
        userId: users[1]._id,
        type: 'gym',
        title: 'Chest and Triceps Workout',
        description: 'Heavy lifting session',
        duration: 90,
        calories: 450,
        points: 120,
        date: new Date('2026-09-12T06:00:00')
      },
      {
        userId: users[2]._id,
        type: 'yoga',
        title: 'Vinyasa Flow Yoga Class',
        description: '60-minute instructor-led class',
        duration: 60,
        calories: 200,
        points: 100,
        date: new Date('2026-09-12T08:00:00')
      },
      {
        userId: users[3]._id,
        type: 'swimming',
        title: 'Swimming Practice',
        description: '2000m freestyle swim',
        duration: 45,
        distance: 2.0,
        calories: 380,
        points: 140,
        date: new Date('2026-09-12T05:30:00')
      },
      {
        userId: users[4]._id,
        type: 'cycling',
        title: 'Mountain Bike Trail Ride',
        description: 'Challenging terrain at the local trails',
        duration: 120,
        distance: 25.5,
        calories: 520,
        points: 180,
        date: new Date('2026-09-11T17:00:00')
      },
      {
        userId: users[0]._id,
        type: 'running',
        title: 'Evening Jog',
        description: 'Relaxed evening run',
        duration: 25,
        distance: 4.0,
        calories: 280,
        points: 120,
        date: new Date('2026-09-11T18:00:00')
      }
    ])
    console.log(`🏃 Created ${activities.length} activities`)

    // Create leaderboard entries
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[3]._id,
        teamId: teams[0]._id,
        rank: 1,
        points: 920,
        activitiesCount: 8
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        rank: 2,
        points: 850,
        activitiesCount: 12
      },
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        rank: 3,
        points: 780,
        activitiesCount: 7
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        rank: 4,
        points: 720,
        activitiesCount: 9
      },
      {
        userId: users[2]._id,
        teamId: teams[2]._id,
        rank: 5,
        points: 650,
        activitiesCount: 10
      }
    ])
    console.log(`📊 Created ${leaderboard.length} leaderboard entries`)

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[1]._id,
        name: 'Chest and Triceps Blaster',
        description: 'Intense upper body workout',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 225 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 80 },
          { name: 'Tricep Dips', sets: 3, reps: 12 },
          { name: 'Cable Tricep Pushdown', sets: 3, reps: 15, weight: 80 }
        ],
        difficulty: 'advanced',
        duration: 90,
        points: 150
      },
      {
        userId: users[2]._id,
        name: 'Beginner Yoga Flow',
        description: 'Perfect for starting your yoga journey',
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1 },
          { name: 'Downward Dog', sets: 3, reps: 1 },
          { name: 'Warrior Pose', sets: 3, reps: 1 }
        ],
        difficulty: 'beginner',
        duration: 60,
        points: 100
      },
      {
        userId: users[0]._id,
        name: 'Running Endurance Builder',
        description: 'Build your running stamina',
        exercises: [
          { name: 'Warm-up Jog', sets: 1, reps: 1 },
          { name: 'Tempo Run', sets: 5, reps: 1 },
          { name: 'Cool-down Walk', sets: 1, reps: 1 }
        ],
        difficulty: 'intermediate',
        duration: 45,
        points: 120
      }
    ])
    console.log(`💪 Created ${workouts.length} workouts`)

    console.log('\n✨ Database seeding completed successfully!')
    console.log(`📈 Summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Teams: ${teams.length}`)
    console.log(`   - Activities: ${activities.length}`)
    console.log(`   - Leaderboard entries: ${leaderboard.length}`)
    console.log(`   - Workouts: ${workouts.length}`)

    await mongoose.connection.close()
    console.log('\n👋 Disconnected from MongoDB')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
