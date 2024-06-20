"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Model Layer
const dbsqlite_1 = __importDefault(require("../model/dbsqlite"));
class Query {
    /**
     * @param todayDay Integer Number representing number of days from server start (today day publication)
     * @returns FullPublication Object with all data to publish today (if today is the day!)
     */
    static getFullPublicationToday(todayDay) {
        let todaysPubFound = dbsqlite_1.default.QueryWithParams("SELECT * FROM Publication WHERE Day = ? LIMIT 1", [todayDay]);
        if (!todaysPubFound)
            return { found: false, day: 0, message: "", imgs: [] };
        let todaysAllImgs = dbsqlite_1.default.QueryWithParamsAll("SELECT * FROM Image WHERE PublicationDay = ? ORDER BY Name;", [todayDay]);
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
exports.default = Query;
//# sourceMappingURL=query.js.map