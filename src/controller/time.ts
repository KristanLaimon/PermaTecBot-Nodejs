import moment from "moment";
import DbCache from "./db_cache";
import schedule from "node-schedule";

export default class Time {
  // static DailyTask: any;

  /**
   * Run a task everyday at specific hour. This Time class will keep the task on 'DailyTask' property
   * @param dailyCallBack Receives a function to call every day
   * @param Hour Hour of the day to call dailyCallBack. Default = 7 Hours (AM)
   * Format: 24Hrs
   * @returns
   */
  static setupDailyTask(dailyCallBack: () => void, hour: number = 7) {
    return schedule.scheduleJob(
      { hour: hour, tz: "America/Tijuana" },
      dailyCallBack
    );
  }

  static setupTestTask(dailyCallBack: () => void) {
    setInterval(() => {
      dailyCallBack();
    }, 1000);
  }

  static getDaysFromStartingDate(): number {
    let startingDay = moment(DbCache.Config.StartingDay);
    let today = moment();
    return today.diff(startingDay, "days");
  }

  static setupLocaleTimeConfig(): void {
    moment.locale("es");
  }

  static getStartingDate(): moment.Moment {
    return moment(DbCache.Config.StartingDay);
  }
}
