const pool = require("../db/db");

exports.handler = async (event) => {
  const { order_id } = event.pathParameters;
  const { product, amount } = JSON.parse(event.body);
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE orders SET product = ?, amount = ? WHERE order_id = ?",
      [product, amount, order_id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: "Order updated successfully",
              order: { order_id, product, amount },
            }),
          });
        }
      }
    );
  });
};
