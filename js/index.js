"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
console.log("Leyendo variables de entorno...");
const args = process.argv.slice(2);
if (args[0] && args[0] === "--no-warnings") {
    process.emitWarning = () => { };
}
console.log("Argumentos leídos y aceptados");
const permatecbot_1 = __importDefault(require("./core/permatecbot"));
const bot = new permatecbot_1.default(process.env.BOT_TOKEN);
console.log("Instanciando bot y arrancando! PermatecBot Inicializado");
bot.start();
//# sourceMappingURL=index.js.map