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
