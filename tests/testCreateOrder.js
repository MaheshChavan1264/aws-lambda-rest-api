const handler = require("../src/order/createOrder").handler;
const event = require("./event.createOrder.json");
handler(event).then(console.log).catch(console.error);
