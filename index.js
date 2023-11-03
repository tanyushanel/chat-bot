const TelegramAPI = require("node-telegram-bot-api");

const token = "6434499783:AAGQF-NLujUvt_YO8xjhIwJqf-PdX3BBBuU";

const bot = new TelegramAPI(token, { polling: true });

bot.on("message", (msg) => {
  console.log(msg);
});
