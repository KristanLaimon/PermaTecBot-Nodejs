import PermaTecBot from "./permatecbot";
import path from "path";
import fs from "fs";
import { DataUtils } from "../libs/utils";

/** Array Containing all commands setup functions to add to "PermaTecBot" */
const commandsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containing all frontend inline buttons events for INLINE KEYBOARD API */
const eventsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Reads all command files NOT RECURSIVELY on "command" */
function laodAllCommandFiles() {
  const commandsDir = DataUtils.getConfigData().CommandsPath;

  fs.readdirSync(commandsDir).forEach(file => {
    if (file.endsWith(".ts")) {
      require(path.join(commandsDir, file));
    }
  });
}

/**
 * Sets all commands declared in 'Commands' folder to main "PermaTecBot"
 * @param bot PermaTec Bot to add all commands
 */
function setupAllFuncionalityBot(bot: PermaTecBot) {
  commandsToAdd.forEach(setCommandOn => {
    setCommandOn(bot);
  });

  eventsToAdd.forEach(setEventOn => {
    setEventOn(bot);
  });
}

export { commandsToAdd, eventsToAdd, setupAllFuncionalityBot };
