import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configure __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

// PostgreSQL DB connection
import pool from './utils/db.js';

// Route files (all should use `export default router`)
import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customers.js';
import productRoutes from './routes/products.js';
import feedbackRoutes from './routes/feedback.js';
import dashboardRoutes from './routes/dashboard.js';
import analyticsRoutes from './routes/analytics.js';

// ===== Middleware ===== //
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
}));

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); // default layout file = views/layout.ejs

// Globals for views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.hideNavbar = false;
  next();
});

// ===== Routes ===== //
app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/', authRoutes);
// ===== Home Page ===== //
app.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  res.render('home', { title: 'Welcome to Feedbackly' });
});

// Redirect root to login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// ===== Start Server ===== //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
