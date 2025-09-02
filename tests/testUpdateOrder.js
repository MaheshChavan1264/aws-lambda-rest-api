const handler = require("../src/order/updateOrder").handler;
const event = require("./event.updateOrder.json");
handler(event).then(console.log).catch(console.error);
