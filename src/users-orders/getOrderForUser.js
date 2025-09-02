const pool = require("../db/db");

exports.handler = async (event) => {
  const { id, order_id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM orders WHERE user_id = ? AND order_id = ?",
      [id, order_id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        } else if (results.length === 0) {
          resolve({
            statusCode: 404,
            body: JSON.stringify({ error: "Order not found for user" }),
          });
        } else {
          resolve({ statusCode: 200, body: JSON.stringify(results[0]) });
        }
      }
    );
  });
};
