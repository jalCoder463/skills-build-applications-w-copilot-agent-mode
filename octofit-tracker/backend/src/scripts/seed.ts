import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import Team, { ITeam } from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import LeaderboardEntry from '../models/Leaderboard';

// Seed the octofit_db database with test data.
async function seed() {
  console.log('Seed the octofit_db database with test data.');

  await connectDatabase();
  console.log('Connected to MongoDB for seeding octofit_db.');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  const teams = await Team.create([
    {
      name: 'Coastal Crushers',
      description: 'A high-energy endurance team focused on outdoor running and cycling.',
    },
    {
      name: 'Circuit Champions',
      description: 'Indoor cross-training squad with a focus on strength and HIIT sessions.',
    },
  ]) as ITeam[];

  const users = await User.create([
    {
      name: 'Avery Chen',
      email: 'avery.chen@octofit.io',
      role: 'athlete',
      joinedAt: new Date('2025-06-10'),
      team: teams[0]._id,
    },
    {
      name: 'Maya Patel',
      email: 'maya.patel@octofit.io',
      role: 'captain',
      joinedAt: new Date('2024-11-02'),
      team: teams[0]._id,
    },
    {
      name: 'Jordan Brooks',
      email: 'jordan.brooks@octofit.io',
      role: 'athlete',
      joinedAt: new Date('2025-01-18'),
      team: teams[1]._id,
    },
    {
      name: 'Elena Garcia',
      email: 'elena.garcia@octofit.io',
      role: 'coach',
      joinedAt: new Date('2023-09-25'),
      team: teams[1]._id,
    },
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id, users[3]._id];
  await Promise.all(teams.map((team) => team.save()));

  const workouts = await Workout.create([
    {
      title: 'Sunrise Interval Run',
      description: 'A 35-minute interval workout designed to build speed and endurance.',
      difficulty: 'Intermediate',
      durationMinutes: 35,
      category: 'Cardio',
    },
    {
      title: 'Total Body Strength Circuit',
      description: 'An equipment-light strength circuit for athletes on the go.',
      difficulty: 'Advanced',
      durationMinutes: 45,
      category: 'Strength',
    },
    {
      title: 'Recovery Yoga Flow',
      description: 'A gentle stretch and mobility routine to support recovery.',
      difficulty: 'Beginner',
      durationMinutes: 25,
      category: 'Recovery',
    },
    {
      title: 'Trail Sprint Challenge',
      description: 'High-intensity hill sprints with active recovery for speed training.',
      difficulty: 'Advanced',
      durationMinutes: 30,
      category: 'Speed',
    },
  ]);

  await Activity.create([
    {
      user: users[1]._id,
      team: teams[0]._id,
      type: 'Road Run',
      durationMinutes: 52,
      caloriesBurned: 520,
      distanceKm: 10.2,
      date: new Date('2026-05-28T07:30:00Z'),
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'Open Water Swim',
      durationMinutes: 40,
      caloriesBurned: 380,
      distanceKm: 2.1,
      date: new Date('2026-05-29T06:45:00Z'),
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      type: 'HIIT Session',
      durationMinutes: 42,
      caloriesBurned: 460,
      distanceKm: 0,
      date: new Date('2026-05-28T18:00:00Z'),
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 500,
      distanceKm: 0,
      date: new Date('2026-05-30T09:00:00Z'),
    },
  ]);

  await LeaderboardEntry.create([
    {
      user: users[1]._id,
      team: teams[0]._id,
      points: 1180,
      rank: 1,
      period: '2026-05',
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      points: 1090,
      rank: 2,
      period: '2026-05',
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      points: 965,
      rank: 3,
      period: '2026-05',
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      points: 870,
      rank: 4,
      period: '2026-05',
    },
  ]);

  console.log('Inserted sample users, teams, workouts, activities, and leaderboard entries.');
  await mongoose.connection.close();
  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
