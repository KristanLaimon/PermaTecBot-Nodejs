//Dependencies
import { Context, InputFile } from "grammy";
import path from "path";

//View Layer
import PermaTecBot, { BotMode } from "../permatecbot";

//Controller Layer
import DbCache from "../../controller/db_cache";
import Query from "../../controller/query";
import Time from "../../controller/time";
import Subscriptions from "../../controller/subscriptions";

function Publication_Command(bot: PermaTecBot) {
  bot.command("send", ctx => {
    ctx.reply("Escribe el número de día en el que desees consultar.");
    bot.mode = BotMode.ExpectingNextMsg;
    bot.response.setReponse(ctx => {
      let message = ctx.message ?? { text: "" };
      let day = parseInt(message.text ?? "0");
      if (bot.isPublicationDay(day)) {
        if (Subscriptions.isSubscribed(ctx.from?.id ?? 0)) {
          bot.sendPublicationFromDay(day);
        } else {
          ctx.reply("Tienes que estar suscrito para mandarte esto");
        }
      }else{
        ctx.reply("ばか");
      }
    });
  });
}

export { Publication_Command as command };
