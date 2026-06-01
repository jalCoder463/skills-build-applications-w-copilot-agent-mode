import express from 'express';
import { connectDatabase, getMongoUri } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = getMongoUri();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.status(200).json({ status: 'Backend is running', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});
