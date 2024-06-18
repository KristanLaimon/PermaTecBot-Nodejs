# PermaTecCraft Proyect

### Conventions

**Adding a new command**
To add a new command you must do the following:

1. Create a file with command name in "./source/bot/commands/" e.g "start.ts"
2. Create a main method with "COMMANDNAME_command" receiving a parameter of type "PermaTecBot"
3. Set your code with Telegram API inside that and whatever you want to do on that command
4. you can export 2 methods (must) with names:
   - command
   - events
     For your methods to be loaded on bot

Summary:

Command Modules should export a method with (bot: PermatecBot) => void signature:

- If command, it should export 'command'
- If events, it should export 'events'
- If a filter funcionality (consult telegram API), it should export 'filter'

For a better understanding, read and study "./source/commands/start.ts" file.
