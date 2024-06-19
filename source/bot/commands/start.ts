//Dependencies
import { Context, InlineKeyboard } from "grammy";

//View Layer
import PermaTecBot from "../permatecbot";

//Controller Layer
import Subscriptions from "../../controller/subscriptions";
import DbCache from "../../controller/db_cache";
import { UserClickedSuscribedButton } from "../../controller/waiting";

const timeSpan = DbCache.Config.WatingReponseTimeSpan / 1000;

function Start_Command(bot: PermaTecBot) {
  bot.command("start", Start);
}

function Start_Events(bot: PermaTecBot) {
  bot.callbackQuery("subscription-server", Subscribe);
  bot.callbackQuery("desubscription-server", Unsubscribe);
}

function Start(ctx: Context) {
  let foundStartMsg = DbCache.Config.BotMessages.find(
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
}

function Subscribe(ctx: Context) {
  if (!ctx.chat) return;
  const chatId = ctx.chat.id;

  if (UserClickedSuscribedButton(chatId, ctx)) {
    ctx.reply(
      `⏳ Por favor, espera ${timeSpan} segundos antes de intentar suscribirte de nuevo. ⏳`
    );
    ctx.answerCallbackQuery();
    return;
  }

  if (!Subscriptions.exists(chatId)) {
    Subscriptions.insertNewSubscriber(chatId);
    ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
  } else if (Subscriptions.isSubscribed(chatId)) {
    ctx.reply("🟨 Ya se ha suscrito  🟨", {
      reply_markup: new InlineKeyboard().text(
        "Desuscribirse?",
        "desubscription-server"
      ),
    });
  } else {
    Subscriptions.subscribe(chatId);
    ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
  }
  ctx.answerCallbackQuery();
}

function Unsubscribe(ctx: Context) {
  if (ctx.chat) {
    if (UserClickedSuscribedButton(ctx.chat.id, ctx)) {
      ctx.reply(
        `⏳ Por favor, espera ${timeSpan} segundos antes de intentar desuscribirte de nuevo. ⏳`
      );
      ctx.answerCallbackQuery();
      return;
    }

    if (Subscriptions.isSubscribed(ctx.chat.id)) {
      Subscriptions.unsubscribe(ctx.chat.id);
      ctx.reply("🟥 Se ha desuscrito. 🦊😢 🟥");
    } else {
      ctx.reply("Nunca estuvo suscrito..");
    }
    ctx.answerCallbackQuery();
  }
}

//'command' and 'event' is the module interface all Command Files should export to be loaded on bot
export { Start_Command as command, Start_Events as events };

//Alternatively you can just name those function as function command(...)... and function events(...)...
//export {command, events}
