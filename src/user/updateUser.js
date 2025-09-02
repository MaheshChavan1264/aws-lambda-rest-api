const pool = require("../db/db");

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { name, email, age, address, phone } = JSON.parse(event.body);
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET name = ?, email = ?, age = ?, address = ?, phone = ? WHERE id = ?",
      [name, email, age, address, phone, id],
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
              message: "User updated successfully",
              user: { id, name, email, age, address, phone },
            }),
          });
        }
      }
    );
  });
  if (!event.pathParameters || !event.pathParameters.id) {
    console.warn("Validation failed: id required");
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "User id is required" }),
    };
  }
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("Invalid JSON:", err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid request body" }),
    };
  }
  const { id } = event.pathParameters;
  const { name, email, age, address, phone } = body;
  if (!name || !email) {
    console.warn("Validation failed: name and email required");
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Name and email are required",
      }),
    };
  }
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET name = ?, email = ?, age = ?, address = ?, phone = ? WHERE id = ?",
      [name, email, age, address, phone, id],
      (error, results) => {
        if (error) {
          console.error("DB Error:", error.message);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
          });
        } else {
          console.log("User updated:", id);
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: "User updated successfully",
              user: { id, name, email, age, address, phone },
            }),
          });
        }
      }
    );
  });
};
