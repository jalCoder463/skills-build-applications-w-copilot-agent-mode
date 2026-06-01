import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'captain';
  joinedAt: Date;
  team?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['athlete', 'coach', 'captain'], default: 'athlete' },
    joinedAt: { type: Date, required: true, default: () => new Date() },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
