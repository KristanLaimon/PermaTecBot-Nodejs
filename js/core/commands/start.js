"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.command = void 0;
//Dependencies
const grammy_1 = require("grammy");
//Controller Layer
const subscriptions_1 = __importDefault(require("../../controller/subscriptions"));
const db_cache_1 = __importDefault(require("../../controller/db_cache"));
const waiting_1 = require("../../controller/waiting");
const timeSpan = db_cache_1.default.Config.WatingReponseTimeSpan / 1000;
function Start_Command(bot) {
    bot.command("start", Start);
}
exports.command = Start_Command;
function Start_Events(bot) {
    bot.callbackQuery("subscription-server", Subscribe);
    bot.callbackQuery("desubscription-server", Unsubscribe);
}
exports.events = Start_Events;
function Start(ctx) {
    let foundStartMsg = db_cache_1.default.Config.BotMessages.find(msg => msg.Title === "start");
    if (foundStartMsg) {
        const keyboard = new grammy_1.InlineKeyboard()
            .text("Subscribirme a noticias del server", "subscription-server")
            .row()
            .url("GitHub", "https://github.com/KristanLaimon");
        ctx.reply(foundStartMsg.Message, {
            reply_markup: keyboard,
        });
    }
}
function Subscribe(ctx) {
    if (!ctx.chat)
        return;
    const chatId = ctx.chat.id;
    if ((0, waiting_1.UserClickedSuscribedButton)(chatId, ctx)) {
        ctx.reply(`⏳ Por favor, espera ${timeSpan} segundos antes de intentar suscribirte de nuevo. ⏳`);
        ctx.answerCallbackQuery();
        return;
    }
    if (!subscriptions_1.default.exists(chatId)) {
        subscriptions_1.default.insertNewSubscriber(chatId);
        ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
    }
    else if (subscriptions_1.default.isSubscribed(chatId)) {
        ctx.reply("🟨 Ya se ha suscrito  🟨", {
            reply_markup: new grammy_1.InlineKeyboard().text("Desuscribirse?", "desubscription-server"),
        });
    }
    else {
        subscriptions_1.default.subscribe(chatId);
        ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
    }
    ctx.answerCallbackQuery();
}
function Unsubscribe(ctx) {
    if (ctx.chat) {
        if ((0, waiting_1.UserClickedSuscribedButton)(ctx.chat.id, ctx)) {
            ctx.reply(`⏳ Por favor, espera ${timeSpan} segundos antes de intentar desuscribirte de nuevo. ⏳`);
            ctx.answerCallbackQuery();
            return;
        }
        if (subscriptions_1.default.isSubscribed(ctx.chat.id)) {
            subscriptions_1.default.unsubscribe(ctx.chat.id);
            ctx.reply("🟥 Se ha desuscrito. 🦊😢 🟥");
        }
        else {
            ctx.reply("Nunca estuvo suscrito..");
        }
        ctx.answerCallbackQuery();
    }
}
//Alternatively you can just name those function as function command(...)... and function events(...)...
//export {command, events}
//# sourceMappingURL=start.js.map