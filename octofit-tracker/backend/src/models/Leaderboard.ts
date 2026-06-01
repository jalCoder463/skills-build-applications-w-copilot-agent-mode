import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true }
);

const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
