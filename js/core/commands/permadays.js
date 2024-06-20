"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
//Controller Layer
const time_1 = __importDefault(require("../../controller/time"));
function PermaDays_Command(bot) {
    bot.command("permadays", ctx => {
        let startingDay = time_1.default.getStartingDate();
        let daysPassed = time_1.default.getDaysFromStartingDate();
        const strBuilder = [];
        strBuilder.push(`☀️ Días transcurridos: ${daysPassed} días`);
        strBuilder.push(`📅 Inicio del Server: ${startingDay.format("LL")}`);
        let msg = strBuilder.join("\n");
        ctx.reply(msg);
    });
}
exports.command = PermaDays_Command;
//# sourceMappingURL=permadays.js.map