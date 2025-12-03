const express = require('express');
const { getDatabase } = require('../../db/init');

const router = express.Router();

// Get dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    const db = await getDatabase();

    // Count active producers
    const producersResult = await db.get(
      `SELECT COUNT(*) as count FROM users WHERE user_type = 'producer' AND is_active = 1`
    );

    // Count active vendors
    const vendorsResult = await db.get(
      `SELECT COUNT(*) as count FROM users WHERE user_type = 'vendor' AND is_active = 1`
    );

    // Count total sales (orders)
    const salesResult = await db.get(
      `SELECT COUNT(*) as count FROM orders`
    );

    // Get popular products
    const popularProducts = await db.all(
      `SELECT p.id, p.name, COUNT(oi.id) as order_count 
       FROM products p
       LEFT JOIN order_items oi ON p.id = oi.product_id
       GROUP BY p.id
       ORDER BY order_count DESC
       LIMIT 5`
    );

    // Revenue metrics
    const revenueResult = await db.get(
      `SELECT SUM(total_amount) as total FROM orders`
    );

    res.json({
      active_producers: producersResult.count,
      active_vendors: vendorsResult.count,
      total_sales: salesResult.count,
      total_revenue: revenueResult.total || 0,
      popular_products: popularProducts
    });
  } catch (err) {
    console.error('Get metrics error:', err);
    res.status(500).json({ error: 'Failed to get metrics' });
  }
});

// Get vendor sales history
router.get('/vendor/:vendorId/sales', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const db = await getDatabase();

    const sales = await db.all(
      `SELECT o.id, o.buyer_id, u.name as buyer_name, o.total_amount, o.status, o.created_at 
       FROM orders o
       JOIN users u ON o.buyer_id = u.id
       WHERE o.seller_id = ?
       ORDER BY o.created_at DESC`,
      [vendorId]
    );

    res.json(sales);
  } catch (err) {
    console.error('Get vendor sales error:', err);
    res.status(500).json({ error: 'Failed to get sales history' });
  }
});

// Get vendor statistics
router.get('/vendor/:vendorId/stats', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const db = await getDatabase();

    // Total products
    const productsResult = await db.get(
      `SELECT COUNT(*) as count FROM products WHERE user_id = ?`,
      [vendorId]
    );

    // Total sales
    const salesResult = await db.get(
      `SELECT COUNT(*) as count, SUM(total_amount) as revenue FROM orders WHERE seller_id = ?`,
      [vendorId]
    );

    // Pending orders
    const pendingResult = await db.get(
      `SELECT COUNT(*) as count FROM orders WHERE seller_id = ? AND status = 'pending'`,
      [vendorId]
    );

    res.json({
      products_listed: productsResult.count,
      total_sales: salesResult.count,
      total_revenue: salesResult.revenue || 0,
      pending_orders: pendingResult.count
    });
  } catch (err) {
    console.error('Get vendor stats error:', err);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Get overall category sales
router.get('/categories/sales', async (req, res) => {
  try {
    const db = await getDatabase();

    const categorySales = await db.all(
      `SELECT p.category, COUNT(oi.id) as sales_count, SUM(oi.quantity) as total_quantity
       FROM products p
       LEFT JOIN order_items oi ON p.id = oi.product_id
       GROUP BY p.category
       ORDER BY sales_count DESC`
    );

    res.json(categorySales);
  } catch (err) {
    console.error('Get category sales error:', err);
    res.status(500).json({ error: 'Failed to get category sales' });
  }
});

module.exports = router;
