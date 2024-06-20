"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Model Layer
const dbsqlite_1 = __importDefault(require("../model/dbsqlite"));
class Subscriptions {
    /**
     * Insert a new chatId Subscriber by default with Subscribe === "True"
     * @param newIdChat
     * @returns A boolean value if this method succeeded
     */
    static insertNewSubscriber(newIdChat) {
        const rowsAffected = dbsqlite_1.default.ExecWithParams("INSERT INTO Subscription (ChatID, Subscribed) VALUES (?,?)", [newIdChat, 1]);
        return rowsAffected > 0;
    }
    static subscribe(idChat) {
        const rowsAffected = dbsqlite_1.default.ExecWithParams(`
      UPDATE Subscription
      SET Subscribed = TRUE
      WHERE ChatID = ?;
      `, [idChat]);
        return rowsAffected > 0;
    }
    // idChat MUST BE IN JSON DATABASE!
    static unsubscribe(idChat) {
        const rowsAffected = dbsqlite_1.default.ExecWithParams(`
      UPDATE Subscription
      SET Subscribed = FALSE
      WHERE ChatID = ?;
      `, [idChat]);
        return rowsAffected > 0;
    }
    //is a boolean return type really
    static isSubscribed(idChat) {
        let foundSub = dbsqlite_1.default.QueryWithParams("SELECT Subscribed FROM Subscription WHERE ChatID = ?;", [idChat]);
        return foundSub && foundSub.Subscribed === 1;
    }
    static exists(idChat) {
        let exists = dbsqlite_1.default.QueryWithParams("SELECT ChatID FROM Subscription WHERE ChatID = ?;", [idChat]);
        return typeof exists !== "undefined";
    }
    static getAllSubs() {
        let allSubs = dbsqlite_1.default.QueryAll("SELECT * FROM Subscription;");
        return allSubs;
    }
}
exports.default = Subscriptions;
//# sourceMappingURL=subscriptions.js.map