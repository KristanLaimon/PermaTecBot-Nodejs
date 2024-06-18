import Config from "./config";
import fs from "fs";

export default class Subscriptions {
  //Class code for retrieve basic info from dbsqlite ///////////////
  static saveChatSubData(idChatsReady: number[]) {
    let idChatsJson = JSON.stringify(idChatsReady);
    fs.writeFileSync(Config.Data.SubscriptionsPath, idChatsJson);
  }

  //is a boolean return type really
  static saveNewChatSubscriber(newIdChat: number): void {
    //   let allIds = this.getChatSubsData();
    //   if (allIds.find(idStored => idStored === newIdChat)) {
    //     return false;
    //   } else {
    //     allIds.push(newIdChat);
    //   }
    //   this.saveChatSubData(allIds);
    //   return true;
  }

  // idChat MUST BE IN JSON DATABASE!
  static deleteSubscription(idChat: number) {
    //   let allIds = this.getChatSubsData();
    //   for (let i = 0; i < allIds.length; i++) {
    //     if (allIds[i] === idChat) {
    //       allIds = allIds.slice(i, i);
    //       this.saveChatSubData(allIds);
    //       return;
    //     }
    //   }
    //   throw Error("Subscription isn't on JSON database");
  }

  // Probably use a hash method to improve performance. Whattt, to add a subscriber already does this thing!
  //is a boolean return type really
  static isSubscribed(idChat: number): void {
    // let allIds = this.getChatSubsData();
    // for (let i = 0; i < allIds.length; i++) {
    //   if (allIds[i] === idChat) {
    //     return true;
    //   }
    // }
    // return false;
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
