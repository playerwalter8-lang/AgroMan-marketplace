const express = require('express');
const { getDatabase } = require('../../db/init');

const router = express.Router();

// Get user's cart
router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await getDatabase();

    const cartItems = await db.all(
      `SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.image_url 
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ items: cartItems, total: total.toFixed(2) });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

// Add to cart
router.post('/cart/add', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDatabase();
    await db.run(
      `INSERT INTO carts (user_id, product_id, quantity) 
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + ?`,
      [user_id, product_id, quantity, quantity]
    );

    res.json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Remove from cart
router.delete('/cart/item/:cartItemId', async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const db = await getDatabase();

    await db.run(`DELETE FROM carts WHERE id = ?`, [cartItemId]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Create order from cart
router.post('/order/create', async (req, res) => {
  try {
    const { buyer_id, seller_id, delivery_address } = req.body;

    if (!buyer_id || !seller_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDatabase();

    // Get cart items
    const cartItems = await db.all(
      `SELECT c.quantity, p.id, p.price FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [buyer_id]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const orderResult = await db.run(
      `INSERT INTO orders (buyer_id, seller_id, total_amount, delivery_address, status) 
       VALUES (?, ?, ?, ?, 'pending')`,
      [buyer_id, seller_id, total, delivery_address || null]
    );

    // Add order items
    for (const item of cartItems) {
      await db.run(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
         VALUES (?, ?, ?, ?)`,
        [orderResult.lastID, item.id, item.quantity, item.price]
      );
    }

    // Clear cart
    await db.run(`DELETE FROM carts WHERE user_id = ?`, [buyer_id]);

    res.status(201).json({
      message: 'Order created successfully',
      order_id: orderResult.lastID,
      total_amount: total.toFixed(2)
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's orders
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await getDatabase();

    const orders = await db.all(
      `SELECT o.*, u.name as seller_name FROM orders o
       JOIN users u ON o.seller_id = u.id
       WHERE o.buyer_id = ? OR o.seller_id = ?
       ORDER BY o.created_at DESC`,
      [userId, userId]
    );

    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

// Update order status
router.put('/order/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const db = await getDatabase();
    await db.run(
      `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [status, id]
    );

    res.json({ message: 'Order status updated' });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
