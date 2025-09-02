const pool = require("../db/db");

exports.handler = async (event) => {
  const { id, order_id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM orders WHERE user_id = ? AND order_id = ?",
      [id, order_id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              message: "Order deleted for user",
              order_id,
              user_id: id,
            }),
          });
        }
      }
    );
  });
};
