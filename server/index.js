import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeDatabase } from './db/index.js';
import { authenticateToken } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import { mockDatabase } from './mockData.js';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

let db;

// Initialize database
initializeDatabase().then((database) => {
  db = database;
  console.log('Database initialized');
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

// Auth routes
app.use('/api/auth', authRoutes(db));

// Protected routes
app.use('/api/collection', authenticateToken, async (req, res, next) => {
  try {
    const userModels = await db.all(
      'SELECT model_id, notes FROM user_collections WHERE user_id = ?',
      [req.user.id]
    );
    req.userModels = userModels;
    next();
  } catch (err) {
    next(err);
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchResults = mockDatabase.models
      .filter(model => 
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.series.toLowerCase().includes(query.toLowerCase())
      )
      .map(model => ({
        title: model.name,
        url: `/models/${model.id}`,
        description: `${model.year} ${model.series}`
      }));

    res.json(searchResults);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ 
      error: 'Failed to search Hot Wheels database',
      details: error.message 
    });
  }
});

// Add model to collection
app.post('/api/collection/add', authenticateToken, async (req, res) => {
  try {
    const { modelId, notes } = req.body;

    await db.run(
      'INSERT INTO user_collections (user_id, model_id, notes) VALUES (?, ?, ?)',
      [req.user.id, modelId, notes]
    );

    res.json({ message: 'Model added to collection' });
  } catch (err) {
    console.error('Add to collection error:', err);
    res.status(500).json({ error: 'Failed to add model to collection' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});