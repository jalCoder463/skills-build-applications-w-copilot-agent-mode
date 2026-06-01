import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members');
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  res.json(team);
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('members');
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  res.status(204).send();
});

export default router;
