import { Bot } from "grammy";
import { setupAllFuncionalityBot } from "./command_center";
import Time from "../controller/time";

export default class PermaTecBot extends Bot {
  constructor(tokenAPI: string) {
    super(tokenAPI);
    setupAllFuncionalityBot(this);
    Time.setupLocaleTimeConfig();
  }
}
