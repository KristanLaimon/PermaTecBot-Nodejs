# PermaTecCraft Proyect

A telegram bot for server PermaCraft!

This uses node v18.

## Adding a new command

To add a new command you must do the following:

1. Create a file with command name in "./source/bot/commands/" e.g "start.ts"
2. Create a main method with "COMMANDNAME_command" receiving a parameter of type "PermaTecBot"
3. Set your code with Telegram API inside that and whatever you want to do on that command
4. you can export 2 methods (must) with names:
   - command
   - events
     For your methods to be loaded on bot

Summary:

Command Modules should export a method with (bot: PermatecBot) => void signature:

- If command, it should export 'command'
- If events, it should export 'events'
- If a filter funcionality (consult telegram API), it should export 'filter'

For a better understanding, read and study the following from start.ts file

---

import { InlineKeyboard } from "grammy";
import PermaTecBot from "../permatecbot";
import Config from "../../controller/config";
import Subscriptions from "../../controller/subscriptions";

function Start_Command(bot: PermaTecBot) {
bot.command("start", ctx => {
let foundStartMsg = Config.Data.BotMessages.find(
msg => msg.Title === "start"
);

    if (foundStartMsg) {
      const keyboard = new InlineKeyboard()
        .text("Subscribirme a noticias del server", "subscription-server")
        .row()
        .url("GitHub", "https://github.com/KristanLaimon");

      ctx.reply(foundStartMsg.Message, {
        reply_markup: keyboard,
      });
    }

});
}

function Start_Events(bot: PermaTecBot) {
bot.callbackQuery("subscription-server", ctx => {
if (ctx.chat) {
if (Subscriptions.newSub(ctx.chat.id)) {
ctx.reply(`Se ha suscrito con el id ${ctx.chat.id} correctamente!`);
} else {
const inlineKeyB = new InlineKeyboard().text(
"Desuscribirse?",
"desubscription-server"
);

        ctx.reply("Ya se ha suscrito 🦊", {
          reply_markup: inlineKeyB,
        });
      }
      ctx.answerCallbackQuery(); // remove loading animation
    }
    //I should log when chat is undefined....

});

bot.callbackQuery("desubscription-server", ctx => {
if (ctx.chat) {
if (Subscriptions.isSubscribed(ctx.chat.id)) {
Subscriptions.deleteSubscription(ctx.chat.id);
ctx.reply("Se ha desuscrito. 🦊😢");
} else {
ctx.reply("Nunca estuvo suscrito..");
}
ctx.answerCallbackQuery();
}
});
}

//'command' and 'event' is the module interface all Command Files should export to be loaded on bot
export { Start_Command as command, Start_Events as events };

//Alternatively you can just name those function as function command(...)... and function events(...)...
//export {command, events}

## Adding a ExpectingNextMessage Event Function on bot!

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
