require("dotenv").config();
import PermaTecBot from "./bot/permatecbot";
import Time from "./controller/time";

const bot = new PermaTecBot(<string>process.env.BOT_TOKEN);
Time.setupLocaleTimeConfig();
Time.setupDailyTask(bot);
bot.start();
