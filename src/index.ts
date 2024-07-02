require("dotenv").config();
console.log("Leyendo variables de entorno...");

const args = process.argv.slice(2);
if (args[0] && args[0] === "--no-warnings") {
  process.emitWarning = () => {};
}
console.log("Argumentos leídos y aceptados");

import PermaTecBot from "./core/permatecbot";
const bot = new PermaTecBot(<string>process.env.BOT_TOKEN);
console.log("Instanciando bot y arrancando! PermatecBot Inicializado");
bot.start();
