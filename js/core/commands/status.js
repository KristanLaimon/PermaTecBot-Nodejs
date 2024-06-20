"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
//Controller Layer
const apis_1 = __importDefault(require("../../controller/apis"));
function Status_Command(bot) {
    bot.command("status", ctx => {
        apis_1.default.GetServerStatus(inf => {
            const strBuilder = [];
            strBuilder.push(`📌 Online: ${inf.online}`);
            if (inf.online) {
                strBuilder.push(`⏏️ Cantidad Max. Jugadores: ${inf.players.max}`);
                strBuilder.push(`📨 MOTD: ${inf.motd.html}`);
                strBuilder.push(`✨ Versión: ${inf.version}`);
            }
            strBuilder.push(`🛠️  Ip: tecnianosisc.fun | foxxymc.tech`);
            strBuilder.push(`💀 Puerto: 25565`);
            ctx.reply(strBuilder.join("\n"));
        }, "foxxymc.tech");
    });
}
exports.command = Status_Command;
//# sourceMappingURL=status.js.map