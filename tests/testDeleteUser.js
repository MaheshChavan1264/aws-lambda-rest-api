const handler = require("../src/user/deleteUser").handler;
const event = require("./event.deleteUser.json");
handler(event).then(console.log).catch(console.error);
