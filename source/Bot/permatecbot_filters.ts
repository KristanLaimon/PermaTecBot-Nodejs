import TestBot from "./permatecbot";
import Utils from "../libs/utils";

export default function ConfigFilters(bot: TestBot): void {
    bot.on("message:text", ctx => {
        let realMsg = bot.screamingMode
            ? ctx.message.text.toUpperCase()
            : Utils.capitalizeFirstLetter(ctx.message.text);

        ctx.reply(realMsg);
    });
}
