import { InlineKeyboard } from "grammy";
import { DataUtils } from "../../model/libs/utils";
import PermaTecBot from "../permatecbot";

function Start_Command(bot: PermaTecBot) {
  bot.command("start", ctx => {
    let startBotMsg = DataUtils.getConfigData()
      .BotMessages.filter(msg => msg.Title === "start")
      .at(0);

    if (startBotMsg) {
      const keyboard = new InlineKeyboard()
        .text("Subscribirme a noticias del server", "subscription-server")
        .row();
      // .url("Telegram", "telegram.org");

      ctx.reply(startBotMsg.Message, {
        reply_markup: keyboard,
      });
    }
  });
}

function Start_Events(bot: PermaTecBot) {
  bot.callbackQuery("subscription-server", ctx => {
    if (ctx.chat) {
      if (DataUtils.saveNewChatSubscriber(ctx.chat.id)) {
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
      if (DataUtils.isSubscribed(ctx.chat.id)) {
        DataUtils.deleteSubscription(ctx.chat.id);
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
