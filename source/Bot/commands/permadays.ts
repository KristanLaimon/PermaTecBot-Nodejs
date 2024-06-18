import { TimeUtils } from "../../model/libs/utils";
import PermaTecBot from "../permatecbot";
import { commandsToAdd } from "../command_center";

function PermaDays_Command(bot: PermaTecBot) {
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

export { PermaDays_Command as command };
