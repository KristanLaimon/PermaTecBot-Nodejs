import TestBot from "./permatecbot";
import Utils from "../utils";

export default function SetupFilters(bot: TestBot): void {
    bot.on("message:text", ctx => {
        let realMsg = bot.screamingMode
            ? ctx.message.text.toUpperCase()
            : Utils.capitalizeFirstLetter(ctx.message.text);

        ctx.reply(realMsg);
    });
}
