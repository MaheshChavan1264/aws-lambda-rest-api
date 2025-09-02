const handler = require("../src/user/updateUser").handler;
const event = require("./event.updateUser.json");
handler(event).then(console.log).catch(console.error);
