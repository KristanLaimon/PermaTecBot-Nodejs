import DbSqlite from "../model/dbsqlite";

export default class Subscriptions {
  static newSub(newIdChat: number): boolean {
    const rowsAffected = DbSqlite.QueryWithParams(
      "INSERT INTO Subscription (ChatID, Subscribed) VALUES (?,?)",
      [newIdChat, true]
    );

    return rowsAffected > 0;
  }

  // idChat MUST BE IN JSON DATABASE!
  static deleteSubscription(idChat: number) {
    const rowsAffected = DbSqlite.QueryWithParams(
      `
      UPDATE Subscription
      SET Subscribed = true
      WHERE ChatID = ?;
      `,
      [idChat]
    );

    return rowsAffected > 0;
  }

  //is a boolean return type really
  static isSubscribed(idChat: number): boolean {
    let found = DbSqlite.Query(
      "SELECT EXISTS (SELECT * FROM Subscription WHERE ChatID = ?);"
    ) as boolean;
    return found;
  }

  static getAllChatSubscribers() {
    // let jsonFilePath = this.getConfigData().SubscriptionsPath;
    // let fileContent = fs.readFileSync(jsonFilePath).toString();
    // return JSON.parse(fileContent) as number[];
  }

  //this should return a number[] really
  static getChatSubsData(): void {
    //   let jsonFilePath = this.readJsonFile().SubscriptionsPath;
    //   let fileContent = fs.readFileSync(jsonFilePath).toString();
    //   let allIds: number[];
    //   if (fileContent === "") {
    //     allIds = [];
    //   } else {
    //     allIds = JSON.parse(fileContent) as number[];
    //   }
    //   return allIds;
  }
}
