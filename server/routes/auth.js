import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateToken } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export default function authRoutes(db) {
  // Register
  router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = registerSchema.parse(req.body);

      // Check if user exists
      const existingUser = await db.get(
        'SELECT id FROM users WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create user
      const result = await db.run(
        'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)',
        [crypto.randomUUID(), username, email, passwordHash]
      );

      const user = await db.get('SELECT id, username FROM users WHERE id = ?', [result.lastID]);
      const token = generateToken(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({ user: { id: user.id, username: user.username } });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error('Registration error:', err);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);

      const user = await db.get(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({ user: { id: user.id, username: user.username } });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Logout
  router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  });

  // Get current user
  router.get('/me', async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ user: null });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await db.get(
        'SELECT id, username, email FROM users WHERE id = ?',
        [decoded.id]
      );

      if (!user) {
        res.clearCookie('token');
        return res.json({ user: null });
      }

      res.json({ user });
    } catch (err) {
      res.clearCookie('token');
      res.json({ user: null });
    }
  });

  return router;
}