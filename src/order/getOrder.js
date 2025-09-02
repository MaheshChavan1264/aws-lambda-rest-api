const pool = require("../db/db");

exports.handler = async (event) => {
  const { order_id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [order_id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else if (results.length === 0) {
          resolve({
            statusCode: 404,
            body: JSON.stringify({
              success: false,
              message: "Order not found",
            }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ success: true, order: results[0] }),
          });
        }
      }
    );
  });
};
