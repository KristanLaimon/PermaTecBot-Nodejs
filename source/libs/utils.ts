import fs from "fs";
import moment, { Moment } from "moment";
import cron from "node-cron";
import sqlite from "better-sqlite3";
import PermaTecBot from "../bot/permatecbot";

export class ConfigUtils {
  static setupTimeConfig(): void {
    moment.locale("es");
  }

  static setupDailyTask(bot: PermaTecBot): cron.ScheduledTask {
    return cron.schedule(
      "0 0 7 * * *",
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

export class DataUtils {
  static getConfigData(): Config {
    let content = fs.readFileSync("./config.json");
    return JSON.parse(content.toString()) as Config;
  }

  static getAllPublicationDB(): Publication[] {
    let db = sqlite(this.getConfigData().DatabasePath);
    let pubs = db.prepare("SELECT * FROM Publication").all() as Publication[];
    db.close();
    return pubs;
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
