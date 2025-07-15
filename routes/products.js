// ✅ /routes/products.js
import express from 'express';
import pool from '../utils/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY product_id ASC');
    res.render('products', { title: 'Products', products: result.rows });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error retrieving product list');
  }
});

router.post('/add', async (req, res) => {
  const { name, category, price } = req.body;
  const currency = '$'; // ✅ Default value
  console.log('🚀 New Product Submitted:', req.body);
  try {
    await pool.query(
      'INSERT INTO products (name, category, price, currency) VALUES ($1, $2, $3, $4)',
      [name, category, price, currency]
    );
    res.redirect('/products');
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send('Error adding product');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Product not found');
    res.render('edit_product', { title: 'Edit Product', product: result.rows[0] });
  } catch (err) {
    console.error('Error loading product:', err);
    res.status(500).send('Error loading product');
  }
});

router.post('/edit/:id', async (req, res) => {
  const { name, category, price } = req.body;
  const currency = '$';
  try {
    await pool.query(
      'UPDATE products SET name = $1, category = $2, price = $3, currency = $4 WHERE product_id = $5',
      [name, category, price, currency, req.params.id]
    );
    res.redirect('/products');
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Error updating product');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE product_id = $1', [req.params.id]);
    res.redirect('/products');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product');
  }
});

export default router;
