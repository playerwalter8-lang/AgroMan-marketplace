const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('../../db/init');

const router = express.Router();

// Register user (producer or vendor)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, user_type, phone, location } = req.body;

    if (!email || !password || !name || !user_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['producer', 'vendor', 'consumer'].includes(user_type)) {
      return res.status(400).json({ error: 'Invalid user_type' });
    }

    const db = await getDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users (email, password, name, user_type, phone, location) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, name, user_type, phone || null, location || null]
    );

    const token = jwt.sign(
      { userId: result.lastID, email, user_type },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result.lastID, email, name, user_type },
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const db = await getDatabase();
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name, user_type: user.user_type },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await getDatabase();
    const user = await db.get(
      `SELECT id, email, name, user_type, phone, location, created_at FROM users WHERE id = ?`,
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

module.exports = router;
