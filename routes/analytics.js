import express from 'express';
import pool from '../utils/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sentimentCounts = await pool.query(`
      SELECT sentiment, COUNT(*) as count
      FROM feedback
      GROUP BY sentiment
    `);

    const sentimentOverTime = await pool.query(`
      SELECT feedback_date, sentiment, COUNT(*) as count
      FROM feedback
      GROUP BY feedback_date, sentiment
      ORDER BY feedback_date
    `);

    const productSentiment = await pool.query(`
      SELECT p.name as product, f.sentiment, COUNT(*) as count
      FROM feedback f
      JOIN products p ON f.product_id = p.product_id
      GROUP BY p.name, f.sentiment
    `);

    const countryDistribution = await pool.query(`
      SELECT country, COUNT(*) as count
      FROM customers
      GROUP BY country
    `);

    const topCustomers = await pool.query(`
      SELECT c.name, COUNT(f.feedback_id) as count
      FROM feedback f
      JOIN customers c ON f.customer_id = c.customer_id
      GROUP BY c.name
      ORDER BY count DESC
      LIMIT 5
    `);

    const topPositiveProducts = await pool.query(`
      SELECT p.name, COUNT(*) as count
      FROM feedback f
      JOIN products p ON f.product_id = p.product_id
      WHERE f.sentiment = 'Positive'
      GROUP BY p.name
      ORDER BY count DESC
      LIMIT 5
    `);

    res.render('analytics', {
      title: 'Analytics',
      sentimentCounts: sentimentCounts.rows,
      sentimentOverTime: sentimentOverTime.rows,
      productSentiment: productSentiment.rows,
      countryDistribution: countryDistribution.rows,
      topCustomers: topCustomers.rows,
      topPositiveProducts: topPositiveProducts.rows
    });
  } catch (err) {
    console.error('Error loading analytics:', err);
    res.status(500).send('Failed to load analytics');
  }
});

export default router;
