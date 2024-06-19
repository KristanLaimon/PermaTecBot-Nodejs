import { Bot, InputFile } from "grammy";
import { setupAllFuncionalityBot } from "./command_center";
import Time from "../controller/time";
import BotResponse from "./permatecbot_response";
import Subscriptions from "../controller/subscriptions";
import DbCache from "../controller/db_cache";
import path from "path";
import Config from "../controller/config";

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
    Time.setupTestTask();

    // Time.setupDailyTask(this.dailyBotTask, 7).start();
  }
}
