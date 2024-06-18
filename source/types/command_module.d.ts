import PermaTecBot from "../bot/permatecbot";

interface CommandModule {
  command: (bot: PermaTecBot) => void;
  events: (bot: PermaTecBot) => void;
}
