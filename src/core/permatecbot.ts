//Dependencies
import path from "path";
import { Bot, InputFile } from "grammy";

//View Layer
import { setupAllFuncionalityBot } from "./command_center";
import BotResponse from "./permatecbot_response";

//Controller Layer
import Time from "../controller/time";
import DbCache from "../controller/db_cache";
import Subscriptions from "../controller/subscriptions";
import Query from "../controller/query";
import { Message } from "grammy/types";

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
    Time.setupDailyTask(this.dailyBotTask.bind(this), 0);
    // Time.setupTestTask(this.dailyBotTask.bind(this));
  }

  dailyBotTask() {
    let daysPassed = Time.getDaysFromStartingDate();
    if (this.isPublicationDay(daysPassed)) {
      this.sendPublicationFromDay(daysPassed);
    }
  }

  isPublicationDay(dayNumber: number) {
    const todayIsTheDay = DbCache.DbPubs.find(pub => pub.Day === dayNumber);
    if (todayIsTheDay) return true;
    else return false;
  }

  sendPublicationFromDay(day: number) {
    const allSubs = Subscriptions.getAllSubs();
    const fullPub = Query.getFullPublicationToday(day);

    let inputImgs = fullPub.imgs.map(img => {
      return new InputFile(path.join(DbCache.Config.ImagesPath, img.Name));
    });

    let coverImgInput = inputImgs[0];
    let restOfThem = inputImgs.slice(1);

    let firstPublication: Promise<Message.PhotoMessage | void>;
    //Max telegram length for caption is 70
    for (const sub of allSubs) {
      if (fullPub.message.length < 70) {
        firstPublication = this.api.sendPhoto(sub.ChatID, coverImgInput, {
          caption: fullPub.message,
        });
      } else {
        firstPublication = this.api
          .sendPhoto(sub.ChatID, coverImgInput)
          .then(() => {
            this.api.sendMessage(sub.ChatID, fullPub.message ?? "");
          });
      }

      firstPublication.then(() => {
        restOfThem.forEach(inputImg => {
          this.api.sendPhoto(sub.ChatID, inputImg);
        });
      });
    }
  }
}
