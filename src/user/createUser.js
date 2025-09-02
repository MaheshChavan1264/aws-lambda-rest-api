const pool = require("../db/db");

exports.handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("Invalid JSON:", err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid request body" }),
    };
  }

  const { name, email, age, address, phone } = body;
  if (!name || !email) {
    console.warn("Validation failed: name and email required");
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Name and email are required",
      }),
    };
  }

  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (name, email, age, address, phone) VALUES (?, ?, ?, ?, ?)",
      [name, email, age, address, phone],
      (error, results) => {
        if (error) {
          console.error("DB Error:", error.message);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else {
          console.log("User created:", results.insertId);
          resolve({
            statusCode: 201,
            body: JSON.stringify({
              success: true,
              message: "User created successfully",
              user: { id: results.insertId, name, email, age, address, phone },
            }),
          });
        }
      }
    );
  });
};
