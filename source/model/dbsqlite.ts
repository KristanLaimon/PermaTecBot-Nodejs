import fs from "fs";
import sqlite, { Database } from "better-sqlite3";
import Config from "../controller/config";

export default class DbSqlite {
  private static _db: Database;

  static get Db() {
    if (this._db === undefined) {
      this._db = new sqlite(Config.Data.DatabasePath);
    }

    return this._db;
  }

  static set Db(newDb: Database) {
    this._db = newDb;
  }

  static Query(sqlQuery: string): any {
    return this.Db.prepare(sqlQuery);
  }

  static QueryAll(sqlQuery: string): any {
    return this.Db.prepare(sqlQuery).all();
  }
}

//Class code for
//1. Bot will have a daily method (on its class) that will call a controller class to get all publications
//2. a middle layer class will handle all publications query calling model layer
//3. Initial daily method bot will call time (controller layer) class to finally set this daily task

//   () => {
//     let daysPassed = Time.getDaysFromStartingDate();
//     let p = DbSqlite.Query("SELECT * FROM Publications") as Publication[]; //This should be on another class

//     if (p.find(pub => pub.Day === daysPassed)) {
//       // bot.api.sendMessage()
//       //I need a way to get chatID, wait, an event, subscribers!
//     }
//   },

//Class code for retrieve basic info from dbsqlite ///////////////

//   static saveChatSubData(idChatsReady: number[]) {
//     let idChatsJson = JSON.stringify(idChatsReady);
//     fs.writeFileSync(this.getConfigData().SubscriptionsPath, idChatsJson);
//   }

//   static saveNewChatSubscriber(newIdChat: number): boolean {
//     let allIds = this.getChatSubsData();

//     if (allIds.find(idStored => idStored === newIdChat)) {
//       return false;
//     } else {
//       allIds.push(newIdChat);
//     }

//     this.saveChatSubData(allIds);
//     return true;
//   }

//   idChat MUST BE IN JSON DATABASE!
//   static deleteSubscription(idChat: number) {
//     let allIds = this.getChatSubsData();

//     for (let i = 0; i < allIds.length; i++) {
//       if (allIds[i] === idChat) {
//         allIds = allIds.slice(i, i);
//         this.saveChatSubData(allIds);
//         return;
//       }
//     }

//     throw Error("Subscription isn't on JSON database");
//   }

//   Probably use a hash method to improve performance. Whattt, to add a subscriber already does this thing!
//   static isSubscribed(idChat: number): boolean {
//     let allIds = this.getChatSubsData();
//     for (let i = 0; i < allIds.length; i++) {
//       if (allIds[i] === idChat) {
//         return true;
//       }
//     }

//     return false;
//   }

//   static getAllChatSubscribers() {
//     let jsonFilePath = this.getConfigData().SubscriptionsPath;
//     let fileContent = fs.readFileSync(jsonFilePath).toString();
//     return JSON.parse(fileContent) as number[];
//   }
