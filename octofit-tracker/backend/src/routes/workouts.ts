import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  res.json(workout);
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.put('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  res.json(workout);
});

router.delete('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  res.status(204).send();
});

export default router;
