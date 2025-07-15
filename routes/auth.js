import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../utils/db.js';

const router = express.Router();

// GET: Login Page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', hideNavbar: true, error: null });
});

// POST: Login Handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.render('login', {
        title: 'Login',
        hideNavbar: true,
        error: 'Invalid email or password',
      });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', {
        title: 'Login',
        hideNavbar: true,
        error: 'Invalid email or password',
      });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET: Register Page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', hideNavbar: true, error: null });
});

// POST: Register Handler
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.render('register', {
        title: 'Register',
        hideNavbar: true,
        error: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ✅ Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/login');
  });
});

export default router;
