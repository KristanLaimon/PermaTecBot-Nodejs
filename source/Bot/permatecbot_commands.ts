import Apis from "../apis/apis";
import PermaTecBot from "./permatecbot";

export default function ConfigCommands(bot: PermaTecBot) {
    bot.command("scream", ctx => {
        bot.screamingMode = true;
        ctx.reply("Ahora hablaré gritando!");
    });

    bot.command("shhh", ctx => {
        bot.screamingMode = false;
        ctx.reply("Ahora hablaré en silencio...");
    });

    bot.command("status", ctx => {
        Apis.GetServerStatus(inf => {
            if (inf.debug.error.aaaa) {
                ctx.reply("Ip inválida, no existe");
                return;
            }
            const strs = [];
            strs.push(`Online: ${inf.online}`);
            ctx.reply(strs.join("\n"));
        }, "foxxymc.tech");
    });
}
