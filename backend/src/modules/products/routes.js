const express = require('express');
const { getDatabase } = require('../../db/init');
const authMiddleware = require('../../middleware/auth');

const router = express.Router();

// Get all products (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    const db = await getDatabase();

    let query = `SELECT p.*, u.name as seller_name FROM products p 
                 JOIN users u ON p.user_id = u.id 
                 WHERE p.is_available = 1`;
    let params = [];

    if (category) {
      query += ` AND p.category = ?`;
      params.push(category);
    }

    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const products = await db.all(query, params);
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    const product = await db.get(
      `SELECT p.*, u.name as seller_name FROM products p 
       JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
      [id]
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// Add product (seller/producer only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, quantity } = req.body;
    const user = req.user; // from JWT set by authMiddleware

    if (!user || !['vendor', 'producer'].includes(user.user_type)) {
      return res.status(403).json({ error: 'Only vendors or producers can add products' });
    }

    if (!name || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDatabase();
    const result = await db.run(
      `INSERT INTO products (user_id, name, description, category, price, quantity) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user.userId, name, description || null, category || 'Geral', price, quantity || 0]
    );

    res.status(201).json({
      message: 'Product added successfully',
      product_id: result.lastID
    });
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, quantity, is_available } = req.body;

    const db = await getDatabase();
    await db.run(
      `UPDATE products SET name=?, description=?, category=?, price=?, quantity=?, is_available=?, updated_at=CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name, description, category, price, quantity, is_available, id]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const db = await getDatabase();
    const categories = await db.all(`SELECT DISTINCT category FROM products ORDER BY category`);
    res.json(categories.map(c => c.category));
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

module.exports = router;
