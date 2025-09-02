const handler = require("../src/order/deleteOrder").handler;
const event = require("./event.deleteOrder.json");
handler(event).then(console.log).catch(console.error);
