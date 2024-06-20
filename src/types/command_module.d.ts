import PermaTecBot from "../bot/permatecbot";

interface CommandModule {
  command: (bot: PermaTecBot) => void | undefined;
  events: (bot: PermaTecBot) => void | undefined;
  filter: (bot: PermaTecBot) => void | undefined;
}
