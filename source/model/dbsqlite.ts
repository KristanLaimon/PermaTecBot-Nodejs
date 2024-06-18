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

  static QueryWithParams(sqlQuery: string, params: any[]) {
    return this.Db.prepare(sqlQuery).get(params);
  }

  static QueryAll(sqlQuery: string): any {
    return this.Db.prepare(sqlQuery).all();
  }

  static ExecWithParams(sqlQuery: string, params: any[]): number {
    let result = this.Db.prepare(sqlQuery).run(params);
    return result.changes;
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
