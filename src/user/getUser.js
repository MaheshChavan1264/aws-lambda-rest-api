const pool = require("../db/db");

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  if (!event.pathParameters || !event.pathParameters.id) {
    console.warn("Validation failed: id required");
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "User id is required" }),
    };
  }
  const { id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error("DB Error:", error.message);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ success: false, message: error.message }),
        });
      } else if (results.length === 0) {
        console.warn("User not found:", id);
        resolve({
          statusCode: 404,
          body: JSON.stringify({ success: false, message: "User not found" }),
        });
      } else {
        console.log("User found:", results[0]);
        resolve({
          statusCode: 200,
          body: JSON.stringify({ success: true, user: results[0] }),
        });
      }
    });
  });
};
