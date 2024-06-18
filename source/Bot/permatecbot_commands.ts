import { InlineKeyboard } from "grammy";
import Apis from "../apis/apis";
import PermaTecBot from "./permatecbot";
import { DataUtils, TimeUtils } from "../libs/utils";

export default function ConfigCommands(bot: PermaTecBot) {
  //Other commands
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

  bot.command("status", ctx => {
    Apis.GetServerStatus(inf => {
      const strBuilder = [];
      strBuilder.push(`📌 Online: ${inf.online}`);

      if (inf.online) {
        strBuilder.push(`⏏️ Cantidad Max. Jugadores: ${inf.players.max}`);
        strBuilder.push(`📨 MOTD: ${inf.motd.html}`);
        strBuilder.push(`✨ Versión: ${inf.version}`);
      } else {
      }

      ctx.reply(strBuilder.join("\n"));
    }, "foxxymc.tech");
  });

  bot.command("permadays", ctx => {
    let startingDay = TimeUtils.getStartingDate();
    let daysPassed = TimeUtils.getDaysFromStartingDate();

    const strBuilder = [];
    strBuilder.push(`☀️ Días transcurridos: ${daysPassed} días`);
    strBuilder.push(`📅 Inicio del Server: ${startingDay.format("LL")}`);
    let msg = strBuilder.join("\n");

    ctx.reply(msg);
  });
}

// bot.command("ruly", ctx => {
//   bot.api
//     .sendPhoto(ctx.chatId, new InputFile("./imgs/ruly.png"), {
//       caption: "Ruly Momento",
//     })
//     .catch(error => ctx.reply(error.toString()));
// });
