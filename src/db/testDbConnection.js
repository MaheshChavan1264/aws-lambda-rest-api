const pool = require("./db");

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    console.log("MySQL connection successful!");
    conn.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
}

testConnection();
