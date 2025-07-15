import express from 'express';
import pool from '../utils/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const totalCustomersResult = await pool.query('SELECT COUNT(*) FROM customers');
    const totalProductsResult = await pool.query('SELECT COUNT(*) FROM products');
    const totalFeedbacksResult = await pool.query('SELECT COUNT(*) FROM feedback');

    const totalCustomers = totalCustomersResult.rows[0].count;
    const totalProducts = totalProductsResult.rows[0].count;
    const totalFeedbacks = totalFeedbacksResult.rows[0].count;

    res.render('dashboard', {
      title: 'Dashboard',
      totalCustomers,
      totalProducts,
      totalFeedbacks
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Failed to load dashboard');
  }
});

export default router;
