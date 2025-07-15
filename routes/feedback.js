import express from 'express';
import pool from '../utils/db.js';

const router = express.Router();

// ✅ GET: Show Feedback Form & Feedback List
router.get('/', async (req, res) => {
  try {
    const customersResult = await pool.query('SELECT * FROM customers ORDER BY name');
    const productsResult = await pool.query('SELECT * FROM products ORDER BY name');
    const feedbackResult = await pool.query(`
      SELECT f.*, c.name AS customer_name, p.name AS product_name
      FROM feedback f
      JOIN customers c ON f.customer_id = c.customer_id
      JOIN products p ON f.product_id = p.product_id
      ORDER BY f.feedback_date DESC
    `);

    res.render('feedback', {
      title: 'Feedback',
      customers: customersResult.rows,
      products: productsResult.rows,
      feedback: feedbackResult.rows
    });
  } catch (err) {
    console.error('Error loading feedback page:', err);
    res.status(500).send('Failed to load feedback page');
  }
});

// ✅ POST: Add New Feedback
router.post('/', async (req, res) => {
  const { customer_id, product_id, feedback_text, feedback_date, sentiment } = req.body;

  try {
    await pool.query(
      `INSERT INTO feedback (customer_id, product_id, feedback_text, feedback_date, sentiment)
       VALUES ($1, $2, $3, $4, $5)`,
      [customer_id, product_id, feedback_text, feedback_date, sentiment]
    );

    res.redirect('/feedback');
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).send('Error saving feedback');
  }
});

// ✅ GET: Load Feedback Edit Form
router.get('/edit/:id', async (req, res) => {
  try {
    const feedbackResult = await pool.query('SELECT * FROM feedback WHERE feedback_id = $1', [req.params.id]);
    const customersResult = await pool.query('SELECT * FROM customers ORDER BY name');
    const productsResult = await pool.query('SELECT * FROM products ORDER BY name');

    if (feedbackResult.rows.length === 0) {
      return res.status(404).send('Feedback not found');
    }

    res.render('edit_feedback', {
      title: 'Edit Feedback',
      feedback: feedbackResult.rows[0],
      customers: customersResult.rows,
      products: productsResult.rows
    });
  } catch (err) {
    console.error('Error loading feedback for edit:', err);
    res.status(500).send('Error loading feedback edit page');
  }
});

// ✅ POST: Update Feedback
router.post('/edit/:id', async (req, res) => {
  const { customer_id, product_id, feedback_text, feedback_date, sentiment } = req.body;

  try {
    await pool.query(
      `UPDATE feedback
       SET customer_id = $1,
           product_id = $2,
           feedback_text = $3,
           feedback_date = $4,
           sentiment = $5
       WHERE feedback_id = $6`,
      [customer_id, product_id, feedback_text, feedback_date, sentiment, req.params.id]
    );

    res.redirect('/feedback');
  } catch (err) {
    console.error('Error updating feedback:', err);
    res.status(500).send('Error updating feedback');
  }
});

// ✅ POST: Delete Feedback
router.post('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM feedback WHERE feedback_id = $1', [req.params.id]);
    res.redirect('/feedback');
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).send('Error deleting feedback');
  }
});

export default router;
