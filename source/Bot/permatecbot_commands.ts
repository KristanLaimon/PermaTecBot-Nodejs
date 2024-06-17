import { InputFile } from "grammy";
import Apis from "../apis/apis";
import PermaTecBot from "./permatecbot";
import moment from "moment";
import fs from "fs";

//Maybe put this initialization in a global variable...for all scripts .ts
let content = fs.readFileSync("./publicenv.json");
const publicEnv = JSON.parse(content.toString()) as PublicEnv;
moment.locale("es");
//Upwards code should be in a "setup global available funct or something" for all proyect

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

  bot.command("ruly", ctx => {
    bot.api
      .sendPhoto(ctx.chatId, new InputFile("./imgs/ruly.png"), {
        caption: "Ruly Momento",
      })
      .catch(error => ctx.reply(error.toString()));
  });

  bot.command("permadays", ctx => {
    let startingDay = moment(publicEnv.StartingDay);
    let today = moment();
    let daysPassed = today.from(startingDay, true);

    const strBuilder = [];
    strBuilder.push(`☀️ Días transcurridos: ${daysPassed}`);
    strBuilder.push(`📅 Inicio del Server: ${startingDay.format("LL")}`);
    let msg = strBuilder.join("\n");

    ctx.reply(msg);
  });
}
