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
}
