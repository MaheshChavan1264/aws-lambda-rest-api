const handler = require("./createUser").handler;
const event = require("./event.createUser.json");

handler(event).then(console.log).catch(console.error);
