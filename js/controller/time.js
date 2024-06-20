"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const db_cache_1 = __importDefault(require("./db_cache"));
const node_schedule_1 = __importDefault(require("node-schedule"));
class Time {
    // static DailyTask: any;
    /**
     * Run a task everyday at specific hour. This Time class will keep the task on 'DailyTask' property
     * @param dailyCallBack Receives a function to call every day
     * @param Hour Hour of the day to call dailyCallBack. Default = 7 Hours (AM)
     * Format: 24Hrs
     * @returns
     */
    static setupDailyTask(dailyCallBack, hour = 7) {
        return node_schedule_1.default.scheduleJob({ hour: hour, tz: "America/Tijuana" }, dailyCallBack);
    }
    static setupTestTask(dailyCallBack) {
        setInterval(() => {
            dailyCallBack();
        }, 1000);
    }
    static getDaysFromStartingDate() {
        let startingDay = (0, moment_1.default)(db_cache_1.default.Config.StartingDay);
        let today = (0, moment_1.default)();
        return today.diff(startingDay, "days");
    }
    static setupLocaleTimeConfig() {
        moment_1.default.locale("es");
    }
    static getStartingDate() {
        return (0, moment_1.default)(db_cache_1.default.Config.StartingDay);
    }
}
exports.default = Time;
//# sourceMappingURL=time.js.map