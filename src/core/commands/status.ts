//View Layer
import PermaTecBot from "../permatecbot";

//Controller Layer
import Apis from "../../controller/apis";

function Status_Command(bot: PermaTecBot) {
  bot.command("status", ctx => {
    Apis.GetServerStatus(inf => {
      const strBuilder = [];
      strBuilder.push(`📌 Online: ${inf.online}`);

      if (inf.online) {
        strBuilder.push(`⏏️ Cantidad Max. Jugadores: ${inf.players.max}`);
        strBuilder.push(`📨 MOTD: ${inf.motd.html}`);
        strBuilder.push(`✨ Versión: ${inf.version}`);
      }

      strBuilder.push(`🛠️  Ip: tecnianosisc.fun | foxxymc.tech`);
      strBuilder.push(`💀 Puerto: 25565`);

      ctx.reply(strBuilder.join("\n"));
    }, "foxxymc.tech");
  });
}

export { Status_Command as command };
