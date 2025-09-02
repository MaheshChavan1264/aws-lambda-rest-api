const createUser = require("./user/createUser");
const getUser = require("./user/getUser");
const updateUser = require("./user/updateUser");
const deleteUser = require("./user/deleteUser");
const createOrder = require("./order/createOrder");
const getOrder = require("./order/getOrder");
const updateOrder = require("./order/updateOrder");
const deleteOrder = require("./order/deleteOrder");
const getOrdersByUser = require("./users-orders/getOrdersByUser");
const createOrderForUser = require("./users-orders/createOrderForUser");
const getOrderForUser = require("./users-orders/getOrderForUser");
const updateOrderForUser = require("./users-orders/updateOrderForUser");
const deleteOrderForUser = require("./users-orders/deleteOrderForUser");

exports.handler = async (event) => {
  const method = event.httpMethod;
  const path = event.resource;

  // User endpoints
  if (method === "POST" && path === "/users") {
    return await createUser.handler(event);
  }
  if (method === "GET" && path === "/users/{id}") {
    return await getUser.handler(event);
  }
  if (method === "PUT" && path === "/users/{id}") {
    return await updateUser.handler(event);
  }
  if (method === "DELETE" && path === "/users/{id}") {
    return await deleteUser.handler(event);
  }

  // Order endpoints
  if (method === "POST" && path === "/orders") {
    return await createOrder.handler(event);
  }
  if (method === "GET" && path === "/orders/{order_id}") {
    return await getOrder.handler(event);
  }
  if (method === "PUT" && path === "/orders/{order_id}") {
    return await updateOrder.handler(event);
  }
  if (method === "DELETE" && path === "/orders/{order_id}") {
    return await deleteOrder.handler(event);
  }

  // Order endpoints using user id
  if (method === "GET" && path === "/users/{id}/orders") {
    return await getOrdersByUser.handler(event);
  }
  if (method === "POST" && path === "/users/{id}/orders") {
    return await createOrderForUser.handler(event);
  }
  if (method === "GET" && path === "/users/{id}/orders/{order_id}") {
    return await getOrderForUser.handler(event);
  }
  if (method === "PUT" && path === "/users/{id}/orders/{order_id}") {
    return await updateOrderForUser.handler(event);
  }
  if (method === "DELETE" && path === "/users/{id}/orders/{order_id}") {
    return await deleteOrderForUser.handler(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Route not found" }),
  };
};
