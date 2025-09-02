const handler = require("../src/user/getUser").handler;
const event = require("./event.getUser.json");
handler(event).then(console.log).catch(console.error);
