"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClickedSuscribedButton = void 0;
const db_cache_1 = __importDefault(require("./db_cache"));
const lastSubscriptionTime = {};
const UserClickedSuscribedButton = (chatId, ctx) => {
    const currentTime = Date.now();
    const timeLimit = db_cache_1.default.Config.WatingReponseTimeSpan;
    if (lastSubscriptionTime[chatId] &&
        currentTime - lastSubscriptionTime[chatId] < timeLimit) {
        return true;
    }
    lastSubscriptionTime[chatId] = currentTime;
    return false;
};
exports.UserClickedSuscribedButton = UserClickedSuscribedButton;
//# sourceMappingURL=waiting.js.map