const pool = require("../db/db");

exports.handler = async (event) => {
  const { id, order_id } = event.pathParameters;
  const { product, amount } = JSON.parse(event.body);
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE orders SET product = ?, amount = ? WHERE user_id = ? AND order_id = ?",
      [product, amount, id, order_id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ order_id, user_id: id, product, amount }),
          });
        }
      }
    );
  });
};
