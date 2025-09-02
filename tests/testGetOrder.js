const handler = require("../src/order/getOrder").handler;
const event = require("./event.getOrder.json");
handler(event).then(console.log).catch(console.error);
