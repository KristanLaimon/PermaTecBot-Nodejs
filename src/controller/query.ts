/// <reference path="../types/dbtypes.d.ts" />

//Model Layer
import DbSqlite from "../model/dbsqlite";

export default class Query {
  /**
   * @param todayDay Integer Number representing number of days from server start (today day publication)
   * @returns FullPublication Object with all data to publish today (if today is the day!)
   */
  static getFullPublicationToday(todayDay: number): FullPublication {
    let todaysPubFound = DbSqlite.QueryWithParams(
      "SELECT * FROM Publication WHERE Day = ? LIMIT 1",
      [todayDay]
    ) as Publication;

    if (!todaysPubFound) return { found: false, day: 0, message: "", imgs: [] };

    let todaysAllImgs = DbSqlite.QueryWithParamsAll(
      "SELECT * FROM Image WHERE PublicationDay = ? ORDER BY Name;",
      [todayDay]
    ) as PubImage | PubImage[];

    if (!Array.isArray(todaysAllImgs)) {
      todaysAllImgs = [todaysAllImgs];
    }

    return {
      found: true,
      day: todayDay,
      message: todaysPubFound.Message,
      imgs: todaysAllImgs,
    };
  }
}
