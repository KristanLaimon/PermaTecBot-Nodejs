"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAllFuncionalityBot = void 0;
//Dependencies
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//Controller layer
const db_cache_1 = __importDefault(require("../controller/db_cache"));
/** Array Containing all commands setup functions to add to "PermaTecBot" */
const commandsToAdd = [];
/** Array containing all frontend inline buttons events for INLINE KEYBOARD API */
const eventsToAdd = [];
/** Array containig all msg filters when user responses to this bot */
const filtersToAdd = [];
/** Reads all command files RECURSIVELY on command folder name from from config.json */ //Local Method
function loadCommandsAndEvents(dir) {
    fs_1.default.readdirSync(dir).forEach(file => {
        const fullPath = path_1.default.join(dir, file);
        if (fs_1.default.statSync(fullPath).isDirectory()) {
            loadCommandsAndEvents(fullPath);
        }
        else if (file.endsWith(".js")) {
            try {
                const commandModule = require(fullPath);
                if (typeof commandModule.command !== "undefined")
                    commandsToAdd.push(commandModule.command);
                if (typeof commandModule.events !== "undefined")
                    eventsToAdd.push(commandModule.events);
                if (typeof commandModule.filter !== "undefined")
                    filtersToAdd.push(commandModule.filter);
            }
            catch (err) {
                console.error(`Error loading module ${fullPath}:`, err);
            }
        }
    });
}
/**
 * Sets all commands declared in 'Commands' folder to main "PermaTecBot"
 * @param bot PermaTec Bot to add all commands
 */
function setupAllFuncionalityBot(bot) {
    const dir = path_1.default.resolve(__dirname, db_cache_1.default.Config.CommandsPath);
    loadCommandsAndEvents(dir);
    commandsToAdd.forEach(setCommandOn => setCommandOn(bot));
    eventsToAdd.forEach(setEventOn => setEventOn(bot));
    filtersToAdd.forEach(setFilterOn => setFilterOn(bot));
}
exports.setupAllFuncionalityBot = setupAllFuncionalityBot;
//# sourceMappingURL=command_center.js.map