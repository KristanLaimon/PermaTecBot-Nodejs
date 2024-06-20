"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
//View Layer
const permatecbot_1 = require("../permatecbot");
const subscriptions_1 = __importDefault(require("../../controller/subscriptions"));
function Publication_Command(bot) {
    bot.command("send", ctx => {
        ctx.reply("Escribe el número de día en el que desees consultar.");
        bot.mode = permatecbot_1.BotMode.ExpectingNextMsg;
        bot.response.setReponse(ctx => {
            let message = ctx.message ?? { text: "" };
            let day = parseInt(message.text ?? "0");
            if (bot.isPublicationDay(day)) {
                if (subscriptions_1.default.isSubscribed(ctx.from?.id ?? 0)) {
                    bot.sendPublicationFromDay(day);
                }
                else {
                    ctx.reply("Tienes que estar suscrito para mandarte esto");
                }
            }
            else {
                ctx.reply("ばか");
            }
        });
    });
}
exports.command = Publication_Command;
//# sourceMappingURL=send_test.js.map