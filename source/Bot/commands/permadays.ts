import PermaTecBot from "../permatecbot";
import Time from "../../controller/time";

function PermaDays_Command(bot: PermaTecBot) {
  bot.command("permadays", ctx => {
    let startingDay = Time.getStartingDate();
    let daysPassed = Time.getDaysFromStartingDate();

    const strBuilder = [];
    strBuilder.push(`☀️ Días transcurridos: ${daysPassed} días`);
    strBuilder.push(`📅 Inicio del Server: ${startingDay.format("LL")}`);
    let msg = strBuilder.join("\n");

    ctx.reply(msg);
  });
}

export { PermaDays_Command as command };
