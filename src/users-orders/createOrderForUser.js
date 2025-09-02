const pool = require("../db/db");

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { product, amount } = JSON.parse(event.body);
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO orders (user_id, product, amount) VALUES (?, ?, ?)",
      [id, product, amount],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        } else {
          resolve({
            statusCode: 201,
            body: JSON.stringify({
              order_id: results.insertId,
              user_id: id,
              product,
              amount,
            }),
          });
        }
      }
    );
  });
};
