const TelegramAPI = require("node-telegram-bot-api");

const { againOptions, gameOptions } = require("./options");

const token = "6434499783:AAGQF-NLujUvt_YO8xjhIwJqf-PdX3BBBuU";

const bot = new TelegramAPI(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  const randNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randNumber;
  await bot.sendMessage(chatId, `Guess the number from 0 to 9`, gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "intro" },
    { command: "/game", description: "guessing a number" },
    { command: "/info", description: "user info" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/bb9/42e/bb942e8b-bda3-4627-8976-5ab2da64f716/192/6.webp"
      );
      return bot.sendMessage(chatId, `Welcome to boOo_boom_bot`);
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `This is a bot for chatting with you, ${msg.from.first_name} ${msg.from.last_name}`
      );
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, `I don't understand you!`);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (+data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `You chose ${data}. That's right!`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `You chose ${data}. Chat-bot chose ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
