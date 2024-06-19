import sqlite, { Database } from "better-sqlite3";
import DbJson from "./dbjson";

export default class DbSqlite {
  private static _db: Database;

  static get Db() {
    if (this._db === undefined) {
      this._db = new sqlite(DbJson.readConfigJson().DatabasePath);
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

  static QueryWithParams(sqlQuery: string, params: any[]) {
    return this.Db.prepare(sqlQuery).get(params);
  }

  static QueryWithParamsAll(sqlQuery: string, params: any[]) {
    return this.Db.prepare(sqlQuery).all(params);
  }

  static ExecWithParams(sqlQuery: string, params: any[]): number {
    let result = this.Db.prepare(sqlQuery).run(params);
    return result.changes;
  }
}
