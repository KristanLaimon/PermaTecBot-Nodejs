import Config from "./config";
import moment from "moment";
import cron from "node-cron";

export default class Time {
  static DailyTask: cron.ScheduledTask;

  /**
   * Run a task everyday at specific hour. This Time class will keep the task on 'DailyTask' property
   * @param dailyCallBack Receives a function to call every day
   * @param Hour Hour of the day to call dailyCallBack. Default = 7 Hours (AM)
   * Format: 24Hrs
   * @returns
   */
  static setupDailyTask(
    dailyCallBack: () => void,
    Hour: number = 7
  ): cron.ScheduledTask {
    return cron.schedule(
      `0 0 ${Hour} * * *`, //Strange Possibility: This can throw an error if I start this bot at 6:59:59 AM. Should never happen.
      dailyCallBack,
      {
        timezone: "America/Tijuana",
      }
    );
  }

  static getDaysFromStartingDate(): number {
    let startingDay = moment(Config.Data.StartingDay);
    let today = moment();
    return today.diff(startingDay, "days");
  }

  static setupLocaleTimeConfig(): void {
    moment.locale("es");
  }

  static getStartingDate(): moment.Moment {
    return moment(Config.Data.StartingDay);
  }
}
