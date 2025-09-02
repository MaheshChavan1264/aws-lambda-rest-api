const pool = require("../db/db");

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    console.warn("Validation failed: id required");
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "User id is required" }),
    };
  }
  const { id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error("DB Error:", error.message);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ success: false, message: error.message }),
        });
      } else {
        console.log("User deleted:", id);
        resolve({
          statusCode: 200,
          body: JSON.stringify({ success: true, message: "User deleted", id }),
        });
      }
    });
  });
};
