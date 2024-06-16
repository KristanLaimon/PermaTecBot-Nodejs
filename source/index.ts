import bot from "./testbot";
require("dotenv").config();

bot.on("message:text", ctx => {
  ctx.reply(ctx.message.text);
});

bot.start();
