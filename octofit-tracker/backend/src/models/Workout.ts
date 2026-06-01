import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  category: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
