const pool = require("../db/db");

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM orders WHERE user_id = ?",
      [id],
      (error, results) => {
        if (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        } else {
          resolve({ statusCode: 200, body: JSON.stringify(results) });
        }
      }
    );
  });
};
