import { Context, InputFile } from "grammy";
import PermaTecBot, { BotMode } from "../permatecbot";
import path from "path";
import Config from "../../controller/config";
import DbCache from "../../controller/db_cache";

function Publication_Command(bot: PermaTecBot) {
  bot.command("send", ctx => {
    ctx.reply(
      "Escribe el número de día en el que desees consultar. Por defecto 10"
    );
    bot.mode = BotMode.ExpectingNextMsg;
    bot.response.setReponse(ResponseGetDay);
  });
}

function ResponseGetDay(ctx: Context) {
  const dia: number = parseInt(ctx.message?.text ?? "10");
  const fullPub = DbCache.getFullPublicationToday(dia);

  if (!fullPub.found) {
    ctx.reply("Hoy no hay nada que publicar");
    return;
  }

  let inputImgs = fullPub.imgs.map(img => {
    return new InputFile(path.join(Config.Data.ImagesPath, img.Name));
  });

  let coverImgInput = inputImgs[0];

  //Max telegram length for caption is 70
  if (fullPub.message && fullPub.message.length < 70) {
    ctx.replyWithPhoto(coverImgInput, { caption: fullPub.message });
  } else {
    ctx.replyWithPhoto(coverImgInput).then(() => {
      ctx.reply(fullPub.message ?? "");
    });
  }

  inputImgs.slice(1).forEach(inputImg => {
    ctx.replyWithPhoto(inputImg);
  });
}

export { Publication_Command as command };
