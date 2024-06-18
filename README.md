# PermaTecCraft Proyect

### Conventions

**Adding a new command**
To add a new command you must do the following:

1. Create a file with command name in "./source/bot/commands/" e.g "start.ts"
2. Create a main method with "COMMANDNAME_command" receiving a parameter of type "PermaTecBot"
3. Set your code with Telegram API inside that and whatever you want to do on that command
4. Use import { commandsToAdd, eventsToAdd } from "../command_center"; at the top
   to push your command method to that array to be able to load it on the bot.

If you use Inline KeyBoard events you can use eventsToAdd to load your events method, with
same signature as your main command method.

For a better understanding, read and study "./source/commands/start.ts" file.
