import DbSqlite from "../model/dbsqlite";

export default class DbCache {
  private static _dbImages: Image[];
  private static _dbPublications: Publication[];

  static get DbImages(): Image[] {
    if (!this._dbImages) {
      this._dbImages = getImgFromDb();
    }

    return this._dbImages;
  }

  static get DbPubs(): Publication[] {
    if (!this._dbPublications) {
      this._dbPublications = getPubsFromDb();
    }

    return this._dbPublications;
  }

  static refreshCache() {
    this._dbImages = getImgFromDb();
    this._dbPublications = getPubsFromDb();
  }

  /**
   * @param todayDay Integer Number representing number of days from server start (today day publication)
   * @returns FullPublication Object with all data to publish today (if today is the day!)
   */
  static getFullPublicationToday(todayDay: number): FullPublication {
    let todaysPubFound = DbSqlite.QueryWithParams(
      "SELECT * FROM Publication WHERE Day = ? LIMIT 1",
      [todayDay]
    ) as Publication;

    if (!todaysPubFound) return { found: false };

    let todaysAllImgs = DbSqlite.QueryWithParams(
      "SELECT * FROM Image WHERE PublicationDay = ? ORDER BY Name;",
      [todayDay]
    ) as Image[];

    return {
      found: true,
      day: todayDay,
      message: todaysPubFound.Message,
      imgs: todaysAllImgs,
    };
  }
}

//Private functions of this module
function getImgFromDb(): Image[] {
  return DbSqlite.QueryAll("SELECT * FROM Image;") as Image[];
}

function getPubsFromDb(): Publication[] {
  return DbSqlite.QueryAll("SELECT * FROM Publication") as Publication[];
}
