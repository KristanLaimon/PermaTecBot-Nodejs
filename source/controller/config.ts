import DbJson from "../model/dbjson";

export default class Config {
  static _data: ConfigJson;

  static get Data() {
    if (!this._data) {
      this._data = DbJson.readConfigJson();
    }

    return this._data;
  }
}
