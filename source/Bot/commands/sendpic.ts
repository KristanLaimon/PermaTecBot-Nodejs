import { InputFile } from "grammy";
import PermaTecBot from "../permatecbot";
import path from "path";
import Config from "../../controller/config";
import DbCache from "../../controller/db_cache";

function Publication_Command(bot: PermaTecBot) {
  bot.command("sendpic", ctx => {
    const fullPub = DbCache.getFullPublicationToday(10);

    if (fullPub.found) {
      ctx.reply("Hoy es el díaaaaa");
    } else {
      ctx.reply("Hoy no hay nada que publicar");
    }

    // let imgs = DbCache.DbImages;
    // let randomIndex = Math.round(Math.random() * imgs.length);
    // let luckyImg = imgs[randomIndex];
    // let pathImage = path.join(Config.Data.ImagesPath, luckyImg.Name);
    // let inputImg = new InputFile(pathImage);
    // ctx.replyWithPhoto(inputImg, {
    //   caption: "Esta es mi primera imagen enviada!!",
    // });
  });
}

export { Publication_Command as command };
