import express from 'express';
import cors from 'cors';
import { connectDatabase, getMongoUri } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
// Keep port fixed to 8000 unless explicitly overridden
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = getMongoUri();

// Codespaces-aware API URL
const codespaceName = process.env.CODESPACE_NAME;
const CODESPACE_URL = codespaceName ? `https://${codespaceName}-${PORT}.app.github.dev` : null;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow localhost dev front-end and Codespaces preview URL if present
const allowedOrigins = [
  `http://localhost:5173`,
  `http://localhost:3000`,
];
if (CODESPACE_URL) allowedOrigins.push(CODESPACE_URL);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, mobile apps, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// MongoDB Connection
connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running', port: PORT, codespacePreview: CODESPACE_URL });
});

// Mount route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server and bind to all interfaces for Codespaces/containers
app.listen(PORT, '0.0.0.0', () => {
  const localUrl = `http://localhost:${PORT}`;
  console.log(`Backend server is running on ${localUrl}`);
  if (CODESPACE_URL) console.log(`Codespaces preview URL: ${CODESPACE_URL}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});
