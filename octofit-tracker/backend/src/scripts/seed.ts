import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';

// Seed command description: This script populates octofit_db with sample users, teams, activities, and leaderboard data.
async function seed() {
  console.log('Connecting to database to seed OctoFit Tracker data...');
  await connectDatabase();

  console.log('Seed command description: Populating octofit_db with default sample entities.');

  // TODO: Implement seed data creation for users, teams, activities, and workout suggestions.

  await mongoose.connection.close();
  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
