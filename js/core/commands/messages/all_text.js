"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
//View Layer only
const permatecbot_1 = require("../../permatecbot");
function TextListener(bot) {
    bot.on("message:text", ctx => {
        switch (bot.mode) {
            case permatecbot_1.BotMode.ExpectingNextMsg:
                bot.response.call(ctx);
                bot.mode = permatecbot_1.BotMode.Idle;
                break;
        }
    });
}
exports.default = TextListener;
exports.filter = TextListener;
//# sourceMappingURL=all_text.js.map