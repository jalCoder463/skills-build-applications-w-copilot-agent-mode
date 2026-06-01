import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
