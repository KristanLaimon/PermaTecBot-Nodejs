import DbCache from "../../controller/db_cache";
import { Context, InputFile } from "grammy";
import PermaTecBot from "../permatecbot";
import fs from "fs";

const Rules_Command = (bot: PermaTecBot) => {
  bot.command("rulesinfo", rules);
};

function rules(ctx: Context) {
  ctx
    .replyWithPhoto(new InputFile("./imgs/logo.jpg"), {
      caption: "Reglamento e Información",
    })
    .then(() => {
      let rulesText = fs.readFileSync(DbCache.Config.RulesPath);
      ctx.reply(rulesText.toString());
    });
}

export { Rules_Command as command };
