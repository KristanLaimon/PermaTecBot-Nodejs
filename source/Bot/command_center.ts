import PermaTecBot from "./permatecbot";
import path from "path";
import fs from "fs";
import { DataUtils } from "../libs/utils";
import { CommandModule } from "../types/command_module";

/** Array Containing all commands setup functions to add to "PermaTecBot" */
const commandsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containing all frontend inline buttons events for INLINE KEYBOARD API */
const eventsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Reads all command files RECURSIVELY on command folder name from from config.json */ //Local Method
function loadCommandsAndEvents(dir: string) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadCommandsAndEvents(fullPath);
    } else if (file.endsWith(".js")) {
      try {
        const commandModule: CommandModule = require(fullPath);
        if (typeof commandModule.command !== "undefined")
          commandsToAdd.push(commandModule.command);

        if (typeof commandModule.events !== "undefined")
          eventsToAdd.push(commandModule.events);
      } catch (err) {
        console.error(`Error loading module ${fullPath}:`, err);
      }
    }
  });
}

/**
 * Sets all commands declared in 'Commands' folder to main "PermaTecBot"
 * @param bot PermaTec Bot to add all commands
 */
function setupAllFuncionalityBot(bot: PermaTecBot) {
  const dir = path.resolve(__dirname, DataUtils.getConfigData().CommandsPath);
  loadCommandsAndEvents(dir);

  commandsToAdd.forEach(setCommandOn => {
    setCommandOn(bot);
  });

  eventsToAdd.forEach(setEventOn => {
    setEventOn(bot);
  });
}

export { commandsToAdd, eventsToAdd, setupAllFuncionalityBot };
