# 💬 Customer Feedback Analysis System

A full-stack application for managing customer feedback with sentiment analysis, trend insights, and a clean dashboard — built using **Node.js**, **Express**, **PostgreSQL**, and **EJS**.

---

## 🚀 Features

- 📋 Add & manage **Customers**, **Products**, and **Feedback**
- 💡 **Sentiment classification** (positive, negative, neutral)
- 📊 **Trend analysis dashboard** with visual charts
- 🛡️ Secure **login/register** system
- 🗂️ PostgreSQL database integration
- 🎯 Triggers, Views, Stored Procedures, and Joins included
- 🖥️ Built with a clean, modern UI using EJS + CSS

---

## 🛠️ Tech Stack

| Category        | Tech Used                         |
|----------------|-----------------------------------|
| Backend         | Node.js, Express.js               |
| Frontend (Views)| EJS, HTML, CSS                    |
| Database        | PostgreSQL                        |
| Data Handling   | SQL Triggers, Views, Joins, SPs   |
| Auth            | Session-based login system        |
| Visualization   | Chart.js / Custom JS (dashboard)  |

---

## 📂 Folder Structure

```
/feedback_analysis
│
├── /routes           → All backend route files (auth, dashboard, products, etc.)
├── /views            → All EJS frontend files
│   └── /partials     → Header, footer, etc.
├── /public           → Static assets like CSS and JS
├── /utils            → DB connection and helper files
├── .env              → Environment variables (DB creds etc.)
├── .gitignore        → To exclude node_modules, .env, etc.
├── app.js            → Main Express server
└── package.json      → Project metadata and dependencies
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Neelima-2330/feedback_analysis.git
   cd feedback_analysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a `.env` file:
     ```
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=your_database
     ```

4. **Run the app**
   ```bash
   node app.js
   ```

## 🙋‍♀️ Author

**Neelima Donepudi**  
[GitHub](https://github.com/Neelima-2330)

---

## ⭐️ Show Some Love

If you like this project, give it a ⭐️ and share it!

---
