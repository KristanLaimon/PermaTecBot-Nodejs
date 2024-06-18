import { Bot } from "grammy";
import { setupAllFuncionalityBot } from "./command_center";
import Time from "../controller/time";
import BotResponse from "./permatecbot_response";

export enum BotMode {
  Idle,
  ExpectingNextMsg,
}

export default class PermaTecBot extends Bot {
  mode: BotMode = BotMode.Idle;
  response: BotResponse = new BotResponse();

  constructor(tokenAPI: string) {
    super(tokenAPI);
    setupAllFuncionalityBot(this);
    Time.setupLocaleTimeConfig();
  }
}
