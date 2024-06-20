import { Context } from "grammy";
import PermaTecBot from "../permatecbot";

const Rules_Command = (bot: PermaTecBot) => {
  bot.command("rules", rules);
};

function rules(ctx: Context) {}

export { Rules_Command as command };
