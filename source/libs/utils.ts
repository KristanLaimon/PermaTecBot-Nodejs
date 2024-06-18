import fs from "fs";
import moment, { Moment } from "moment";
import cron from "node-cron";
import sqlite, { Database } from "better-sqlite3";
import PermaTecBot from "../bot/permatecbot";

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

  static getAllPublicationDB(): Publication[] {
    let pubs = this.Db.prepare(
      "SELECT * FROM Publication"
    ).all() as Publication[];

    this.Db.close();
    return pubs;
  }

  static saveNewChatSubscriber(...idChats: number[]) {
    let jsonFilePath = this.getConfigData().SubscriptionsPath;
    let fileContent = fs.readFileSync(jsonFilePath).toString();
    let allIds: number[];

    if (fileContent === "") {
      allIds = [];
    } else {
      allIds = JSON.parse(fileContent) as number[];
    }

    idChats.forEach(id => {
      allIds.push(id);
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(allIds));
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
