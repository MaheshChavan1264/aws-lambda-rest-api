const pool = require("../db/db");

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.order_id) {
    console.warn("Validation failed: order_id required");
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Order id is required" }),
    };
  }
  const { order_id } = event.pathParameters;
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM orders WHERE order_id = ?",
      [order_id],
      (error, results) => {
        if (error) {
          console.error("DB Error:", error.message);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else {
          console.log("Order deleted:", order_id);
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: "Order deleted",
              order_id,
            }),
          });
        }
      }
    );
  });
};
