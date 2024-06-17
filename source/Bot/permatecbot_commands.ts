import { InputFile } from "grammy";
import Apis from "../apis/apis";
import PermaTecBot from "./permatecbot";
import moment from "moment";
import { DataUtils, TimeUtils } from "../libs/utils";

export default function ConfigCommands(bot: PermaTecBot) {
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
