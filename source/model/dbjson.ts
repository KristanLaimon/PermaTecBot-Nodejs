import fs from "fs";

export default class DbJson {
  static readJsonFile(path: string): any {
    let content = fs.readFileSync(path);
    return JSON.parse(content.toString());
  }

  static readConfigJson(): ConfigJson {
    return this.readJsonFile("./config.json") as ConfigJson;
  }
}

//This should stay on sqlite database

//   static getChatSubsData(): number[] {
//     let jsonFilePath = this.readJsonFile().SubscriptionsPath;
//     let fileContent = fs.readFileSync(jsonFilePath).toString();
//     let allIds: number[];

//     if (fileContent === "") {
//       allIds = [];
//     } else {
//       allIds = JSON.parse(fileContent) as number[];
//     }
//     return allIds;
//   }
