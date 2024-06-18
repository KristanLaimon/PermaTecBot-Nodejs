import { InlineKeyboard } from "grammy";
import PermaTecBot from "../permatecbot";
import Config from "../../controller/config";
import Subscriptions from "../../controller/subscriptions";

function Start_Command(bot: PermaTecBot) {
  bot.command("start", ctx => {
    let foundStartMsg = Config.Data.BotMessages.find(
      msg => msg.Title === "start"
    );

    if (foundStartMsg) {
      const keyboard = new InlineKeyboard()
        .text("Subscribirme a noticias del server", "subscription-server")
        .row()
        .url("GitHub", "https://github.com/KristanLaimon");

      ctx.reply(foundStartMsg.Message, {
        reply_markup: keyboard,
      });
    }
  });
}

function Start_Events(bot: PermaTecBot) {
  bot.callbackQuery("subscription-server", ctx => {
    if (ctx.chat) {
      if (Subscriptions.addNew(ctx.chat.id)) {
        ctx.reply(`Se ha suscrito con el id ${ctx.chat.id} correctamente!`);
      } else {
        const inlineKeyB = new InlineKeyboard().text(
          "Desuscribirse?",
          "desubscription-server"
        );

        ctx.reply("Ya se ha suscrito 🦊", {
          reply_markup: inlineKeyB,
        });
      }
      ctx.answerCallbackQuery(); // remove loading animation
    }
    //I should log when chat is undefined....
  });

  bot.callbackQuery("desubscription-server", ctx => {
    if (ctx.chat) {
      if (Subscriptions.isSubscribed(ctx.chat.id)) {
        Subscriptions.delete(ctx.chat.id);
        ctx.reply("Se ha desuscrito. 🦊😢");
      } else {
        ctx.reply("Nunca estuvo suscrito..");
      }
      ctx.answerCallbackQuery();
    }
  });
}

//'command' and 'event' is the module interface all Command Files should export to be loaded on bot
export { Start_Command as command, Start_Events as events };

//Alternatively you can just name those function as function command(...)... and function events(...)...
//export {command, events}
