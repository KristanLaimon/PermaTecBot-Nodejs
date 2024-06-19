require("dotenv").config();
import PermaTecBot from "./bot/permatecbot";
const bot = new PermaTecBot(<string>process.env.BOT_TOKEN);
bot.start();
