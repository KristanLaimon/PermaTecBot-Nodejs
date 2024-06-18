import PermaTecBot from "../../permatecbot";

export default function ConfigFilters(bot: PermaTecBot): void {
  bot.on("message:text", ctx => {
    ctx.reply("HOlis");
  });
}

export { ConfigFilters as filter };

//Old testing command

// bot.command("ruly", ctx => {
//   bot.api
//     .sendPhoto(ctx.chatId, new InputFile("./imgs/ruly.png"), {
//       caption: "Ruly Momento",
//     })
//     .catch(error => ctx.reply(error.toString()));
// });
