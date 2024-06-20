"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class DbJson {
    static readJsonFile(path) {
        let content = fs_1.default.readFileSync(path);
        return JSON.parse(content.toString());
    }
    static readConfigJson() {
        return this.readJsonFile("./config.json");
    }
}
exports.default = DbJson;
//# sourceMappingURL=dbjson.js.map