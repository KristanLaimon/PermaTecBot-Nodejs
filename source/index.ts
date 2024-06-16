require("dotenv").config();
import PermaTecBot from "./Bot/permatecbot";

const bot = new PermaTecBot(<string>process.env.BOT_TOKEN);
bot.start();
