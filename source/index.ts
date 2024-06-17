require("dotenv").config();
import PermaTecBot from "./bot/permatecbot";
import { ConfigUtils } from "./libs/utils";

const bot = new PermaTecBot(<string>process.env.BOT_TOKEN);
ConfigUtils.setupTimeConfig();
ConfigUtils.setupDailyTask();
bot.start();
