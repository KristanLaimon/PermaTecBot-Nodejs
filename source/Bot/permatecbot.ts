import { Bot } from "grammy";
import InitializeCommands from "./permatecbot_commands";
import ConfigFilters from "./permatecbot_filters";

export default class TestBot extends Bot {
  constructor(tokenAPI: string) {
    super(tokenAPI);
    InitializeCommands(this);
    ConfigFilters(this);
  }
}
