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

  const { user_id, product, amount } = body;
  if (!user_id || !product || !amount) {
    console.warn("Validation failed: user_id, product, and amount required");
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "user_id, product, and amount are required",
      }),
    };
  }

  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO orders (user_id, product, amount) VALUES (?, ?, ?)",
      [user_id, product, amount],
      (error, results) => {
        if (error) {
          console.error("DB Error:", error.message);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else {
          console.log("Order created:", results.insertId);
          resolve({
            statusCode: 201,
            body: JSON.stringify({
              success: true,
              message: "Order created successfully",
              order: { order_id: results.insertId, user_id, product, amount },
            }),
          });
        }
      }
    );
  });
};
