import { Bot } from "grammy";
require("dotenv").config();

const bot = new Bot(<string>process.env.BOT_TOKEN);

bot.on("message:text", (ctx) => {
  ctx.reply(ctx.message.text);
});

bot.start();
