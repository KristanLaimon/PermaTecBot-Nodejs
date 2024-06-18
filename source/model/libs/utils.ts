import fs from "fs";
import moment, { Moment } from "moment";
import cron from "node-cron";
import sqlite, { Database } from "better-sqlite3";
import PermaTecBot from "../../bot/permatecbot";

namespace Utils {}

export class ConfigUtils {
  static setupTimeConfig(): void {
    moment.locale("es");
  }

  /**
   * Run a task everyday at 7AM
   * @param bot
   * @returns
   */
  static setupDailyTask(bot: PermaTecBot): cron.ScheduledTask {
    return cron.schedule(
      "0 0 7 * * *", //Strange Possibility: This can throw an error if I start this bot at 6:59:59 AM. Should never happen.
      () => {
        let daysPassed = TimeUtils.getDaysFromStartingDate();
        let publications = DataUtils.getAllPublicationDB();

        let foundTodayPublication = publications
          .filter(pub => pub.Day === daysPassed)
          .at(0);

        if (foundTodayPublication) {
          // bot.api.sendMessage()
          //I need a way to get chatID, wait, an event, subscribers!
        }
      },
      {
        timezone: "America/Tijuana",
      }
    );
  }
}

export class StringUtils {
  static capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}

/** Manages all JSON and SQLITE data stroring (Needs refactoring maybe) */
export class DataUtils {
  private static _db: Database;

  static get Db() {
    if (this._db === undefined) {
      this._db = new sqlite(this.getConfigData().DatabasePath);
    }

    return this._db;
  }

  static set Db(value: Database) {
    this._db = value;
  }

  static getConfigData(): Config {
    let content = fs.readFileSync("./config.json");
    return JSON.parse(content.toString()) as Config;
  }

  static getChatSubsData(): number[] {
    let jsonFilePath = this.getConfigData().SubscriptionsPath;
    let fileContent = fs.readFileSync(jsonFilePath).toString();
    let allIds: number[];

    if (fileContent === "") {
      allIds = [];
    } else {
      allIds = JSON.parse(fileContent) as number[];
    }
    return allIds;
  }

  static saveChatSubData(idChatsReady: number[]) {
    let idChatsJson = JSON.stringify(idChatsReady);
    fs.writeFileSync(this.getConfigData().SubscriptionsPath, idChatsJson);
  }

  static getAllPublicationDB(): Publication[] {
    let pubs = this.Db.prepare(
      "SELECT * FROM Publication"
    ).all() as Publication[];

    this.Db.close();
    return pubs;
  }

  static saveNewChatSubscriber(newIdChat: number): boolean {
    let allIds = this.getChatSubsData();

    if (allIds.find(idStored => idStored === newIdChat)) {
      return false;
    } else {
      allIds.push(newIdChat);
    }

    this.saveChatSubData(allIds);
    return true;
  }

  //idChat MUST BE IN JSON DATABASE!
  static deleteSubscription(idChat: number) {
    let allIds = this.getChatSubsData();

    for (let i = 0; i < allIds.length; i++) {
      if (allIds[i] === idChat) {
        allIds = allIds.slice(i, i);
        this.saveChatSubData(allIds);
        return;
      }
    }

    throw Error("Subscription isn't on JSON database");
  }

  //Probably use a hash method to improve performance. Whattt, to add a subscriber already does this thing!
  static isSubscribed(idChat: number): boolean {
    let allIds = this.getChatSubsData();
    for (let i = 0; i < allIds.length; i++) {
      if (allIds[i] === idChat) {
        return true;
      }
    }

    return false;
  }

  static getAllChatSubscribers() {
    let jsonFilePath = this.getConfigData().SubscriptionsPath;
    let fileContent = fs.readFileSync(jsonFilePath).toString();
    return JSON.parse(fileContent) as number[];
  }
}

export class TimeUtils {
  static getDaysFromStartingDate(): number {
    let startingDay = moment(DataUtils.getConfigData().StartingDay);
    let today = moment();
    return today.diff(startingDay, "days");
  }
  static getStartingDate(): moment.Moment {
    return moment(DataUtils.getConfigData().StartingDay);
  }
}
