import { Bot } from "grammy";
import configCommands from "./permatecbot_commands";
import configFilters from "./permatecbot_filters";

export default class PermaTecBot extends Bot {
  constructor(tokenAPI: string) {
    super(tokenAPI);
    configCommands(this);
    configFilters(this);
  }
}
