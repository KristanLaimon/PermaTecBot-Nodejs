"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotMode = void 0;
//Dependencies
const path_1 = __importDefault(require("path"));
const grammy_1 = require("grammy");
//View Layer
const command_center_1 = require("./command_center");
const permatecbot_response_1 = __importDefault(require("./permatecbot_response"));
//Controller Layer
const time_1 = __importDefault(require("../controller/time"));
const db_cache_1 = __importDefault(require("../controller/db_cache"));
const subscriptions_1 = __importDefault(require("../controller/subscriptions"));
const query_1 = __importDefault(require("../controller/query"));
var BotMode;
(function (BotMode) {
    BotMode[BotMode["Idle"] = 0] = "Idle";
    BotMode[BotMode["ExpectingNextMsg"] = 1] = "ExpectingNextMsg";
})(BotMode || (exports.BotMode = BotMode = {}));
class PermaTecBot extends grammy_1.Bot {
    constructor(tokenAPI) {
        super(tokenAPI);
        this.mode = BotMode.Idle;
        this.response = new permatecbot_response_1.default();
        (0, command_center_1.setupAllFuncionalityBot)(this);
        time_1.default.setupLocaleTimeConfig();
        time_1.default.setupDailyTask(this.dailyBotTask.bind(this), 0);
        // Time.setupTestTask(this.dailyBotTask.bind(this));
    }
    dailyBotTask() {
        let daysPassed = time_1.default.getDaysFromStartingDate();
        if (this.isPublicationDay(daysPassed)) {
            this.sendPublicationFromDay(daysPassed);
        }
    }
    isPublicationDay(dayNumber) {
        const todayIsTheDay = db_cache_1.default.DbPubs.find(pub => pub.Day === dayNumber);
        if (todayIsTheDay)
            return true;
        else
            return false;
    }
    sendPublicationFromDay(day) {
        const allSubs = subscriptions_1.default.getAllSubs();
        const fullPub = query_1.default.getFullPublicationToday(day);
        let inputImgs = fullPub.imgs.map(img => {
            return new grammy_1.InputFile(path_1.default.join(db_cache_1.default.Config.ImagesPath, img.Name));
        });
        let coverImgInput = inputImgs[0];
        let restOfThem = inputImgs.slice(1);
        let firstPublication;
        //Max telegram length for caption is 70
        for (const sub of allSubs) {
            if (fullPub.message.length < 70) {
                firstPublication = this.api.sendPhoto(sub.ChatID, coverImgInput, {
                    caption: fullPub.message,
                });
            }
            else {
                firstPublication = this.api
                    .sendPhoto(sub.ChatID, coverImgInput)
                    .then(() => {
                    this.api.sendMessage(sub.ChatID, fullPub.message ?? "");
                });
            }
            firstPublication.then(() => {
                restOfThem.forEach(inputImg => {
                    this.api.sendPhoto(sub.ChatID, inputImg);
                });
            });
        }
    }
}
exports.default = PermaTecBot;
//# sourceMappingURL=permatecbot.js.map