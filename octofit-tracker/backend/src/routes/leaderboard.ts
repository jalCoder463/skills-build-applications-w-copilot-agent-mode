import { Router } from 'express';
import LeaderboardEntry from '../models/Leaderboard';

const router = Router();

router.get('/', async (req, res) => {
  const entries = await LeaderboardEntry.find()
    .populate('user team')
    .sort({ points: -1, rank: 1 });
  res.json(entries);
});

export default router;
