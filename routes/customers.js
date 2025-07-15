import express from 'express';
import pool from '../utils/db.js';

const router = express.Router();

// Display all customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY customer_id ASC');
    res.render('customers', { title: 'Customers', customers: result.rows });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).send('Error retrieving customer list');
  }
});

// Handle new customer submission
router.post('/add', async (req, res) => {
  const { name, email, phone, country } = req.body;
  try {
    await pool.query(
      'INSERT INTO customers (name, email, phone, country) VALUES ($1, $2, $3, $4)',
      [name, email, phone, country]
    );
    res.redirect('/customers');
  } catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).send('Error adding customer');
  }
});

// Edit Customer (GET)
router.get('/edit/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Customer not found');
    }
    res.render('edit_customer', { title: 'Edit Customer', customer: result.rows[0] });
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).send('Error loading customer');
  }
});

// Edit Customer (POST)
router.post('/edit/:id', async (req, res) => {
  const { name, email, phone, country } = req.body;
  try {
    await pool.query(
      'UPDATE customers SET name = $1, email = $2, phone = $3, country = $4 WHERE customer_id = $5',
      [name, email, phone, country, req.params.id]
    );
    res.redirect('/customers');
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).send('Error updating customer');
  }
});

// Delete Customer
router.post('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM customers WHERE customer_id = $1', [req.params.id]);
    res.redirect('/customers');
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).send('Error deleting customer');
  }
});

export default router;
