interface ConfigJson {
  StartingDay: string;
  DatabasePath: string;
  SubscriptionsPath: string;
  BotMessages: BotMessage[];
  CommandsPath: string;
}

interface BotMessage {
  Title: string;
  Message: string;
}
