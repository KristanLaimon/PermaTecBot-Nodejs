import { Bot } from "grammy";
import { setupAllFuncionalityBot } from "./command_center";

export default class PermaTecBot extends Bot {
  constructor(tokenAPI: string) {
    super(tokenAPI);
    setupAllFuncionalityBot(this);
  }
}
