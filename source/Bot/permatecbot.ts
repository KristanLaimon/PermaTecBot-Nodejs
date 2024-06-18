import { Bot } from "grammy";
import configFilters from "./commands/messages/msg_responses";
import { setupAllFuncionalityBot } from "./command_center";

export default class PermaTecBot extends Bot {
  constructor(tokenAPI: string) {
    super(tokenAPI);
    setupAllFuncionalityBot(this);
  }
}
