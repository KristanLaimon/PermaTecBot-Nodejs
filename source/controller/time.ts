import Config from "./config";
import moment from "moment";
import schedule from "node-schedule";
import PermaTecBot from "../bot/permatecbot";

export default class Time {
  // static DailyTask: any;

  /**
   * Run a task everyday at specific hour. This Time class will keep the task on 'DailyTask' property
   * @param dailyCallBack Receives a function to call every day
   * @param Hour Hour of the day to call dailyCallBack. Default = 7 Hours (AM)
   * Format: 24Hrs
   * @returns
   */
  static setupDailyTask(dailyCallBack: () => void, hour: number) {
    // return schedule.scheduleJob(
    //   { second: 0, tz: "America/Tijuana" },
    //   dailyCallBack
    // );
  }

  static setupTestTask() {
    // setInterval(() => {
    //   dailyCallBack(bot);
    // }, 1000);
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

// function dailyBotTask(bot: PermaTecBot) {
//   let daysPassed = Time.getDaysFromStartingDate();

//   const todayIsTheDay = DbCache.DbPubs.find(pub => pub.Day === daysPassed);

//   if (todayIsTheDay) {
//     const allSubs = Subscriptions.getAllSubs();
//     const fullPub = DbCache.getFullPublicationToday(daysPassed);

//     let inputImgs = fullPub.imgs.map(img => {
//       return new InputFile(path.join(Config.Data.ImagesPath, img.Name));
//     });

//     let coverImgInput = inputImgs[0];
//     let restOfThem = inputImgs.slice(1);

//     allSubs.forEach(sub => {
//       //Max telegram length for caption is 70
//       if (fullPub.message && fullPub.message.length < 70) {
//         bot.api.sendPhoto(sub.ChatID, coverImgInput, {
//           caption: fullPub.message,
//         });
//       } else {
//         bot.api.sendPhoto(sub.ChatID, coverImgInput).then(() => {
//           bot.api.sendMessage(sub.ChatID, fullPub.message ?? "");
//         });
//       }

//       restOfThem.forEach(inputImg => {
//         bot.api.sendPhoto(sub.ChatID, inputImg);
//       });
//     });
//   }
// }
