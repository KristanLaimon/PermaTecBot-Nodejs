interface Config {
  StartingDay: string;
  DatabasePath: string;
  BotMessages: BotMessage[];
}

interface BotMessage {
  Title: string;
  Message: string;
}
