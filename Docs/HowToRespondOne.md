**Adding a ExpectingNextMessage Event Function on bot!**

Bot has a "BotResponse" 'response' object, it has a method to call once, and
you have to set Bot mode in BotMode.Expecting NextMessage, see one_response_test.ts for example

This uses under the hood messages/all_text.ts funcionality to handle modes on any text received

You can see this code from the file mentioned before:

---

import PermaTecBot, { BotMode } from "../source/bot/permatecbot";

function Test_Command(bot: PermaTecBot) {
bot.command("oneresponse", ctx => {
bot.mode = BotMode.ExpectingNextMsg;
ctx.reply("Se ha activado el modo echo por una sola vez...");

    bot.response.setReponse(ctxUser => {
      if (ctxUser.msg && ctxUser.msg.text) {
        ctxUser.reply(ctxUser.msg.text);
      }
    });

});
}

export { Test_Command as command };
