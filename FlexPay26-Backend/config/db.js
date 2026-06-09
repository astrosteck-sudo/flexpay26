const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000, // 30 seconds
  // CRITICAL FOR AIVEN:
  ssl: {
    rejectUnauthorized: false // Allows connecting safely via SSL without downloading the CA cert file
  }
});

module.exports = pool;