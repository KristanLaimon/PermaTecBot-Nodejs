import Apis from "../../apis/apis";
import PermaTecBot from "../permatecbot";

function Status_Command(bot: PermaTecBot) {
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
}

export { Status_Command as command };
