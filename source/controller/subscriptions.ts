//Model Layer
import DbSqlite from "../model/dbsqlite";

export default class Subscriptions {
  /**
   * Insert a new chatId Subscriber by default with Subscribe === "True"
   * @param newIdChat
   * @returns A boolean value if this method succeeded
   */
  static insertNewSubscriber(newIdChat: number): boolean {
    const rowsAffected = DbSqlite.ExecWithParams(
      "INSERT INTO Subscription (ChatID, Subscribed) VALUES (?,?)",
      [newIdChat, 1]
    );

    return rowsAffected > 0;
  }

  static subscribe(idChat: number) {
    const rowsAffected = DbSqlite.ExecWithParams(
      `
      UPDATE Subscription
      SET Subscribed = TRUE
      WHERE ChatID = ?;
      `,
      [idChat]
    );

    return rowsAffected > 0;
  }

  // idChat MUST BE IN JSON DATABASE!
  static unsubscribe(idChat: number) {
    const rowsAffected = DbSqlite.ExecWithParams(
      `
      UPDATE Subscription
      SET Subscribed = FALSE
      WHERE ChatID = ?;
      `,
      [idChat]
    );

    return rowsAffected > 0;
  }

  //is a boolean return type really
  static isSubscribed(idChat: number): boolean {
    let foundSub = DbSqlite.QueryWithParams(
      "SELECT Subscribed FROM Subscription WHERE ChatID = ?;",
      [idChat]
    ) as { Subscribed: number };

    return foundSub && foundSub.Subscribed === 1;
  }

  static exists(idChat: number): boolean {
    let exists = DbSqlite.QueryWithParams(
      "SELECT ChatID FROM Subscription WHERE ChatID = ?;",
      [idChat]
    );

    return typeof exists !== "undefined";
  }

  static getAllSubs(): Subscription[] {
    let allSubs = DbSqlite.QueryAll(
      "SELECT * FROM Subscription;"
    ) as Subscription[];
    return allSubs;
  }
}
