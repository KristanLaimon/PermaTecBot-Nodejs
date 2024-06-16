import { Bot } from "grammy";

//Creation | tbot = testbot
const tbot = new Bot(<string>process.env.BOT_TOKEN);

//Config
let screamingMode = false;

tbot.command("scream", ctx => (screamingMode = screamingMode!));

export default tbot;
