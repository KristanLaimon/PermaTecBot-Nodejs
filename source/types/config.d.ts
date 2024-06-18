interface ConfigJson {
  StartingDay: string;
  DatabasePath: string;
  SubscriptionsPath: string;
  BotMessages: BotMessage[];
  CommandsPath: string;
  ImagesPath: string;
}

interface BotMessage {
  Title: string;
  Message: string;
}
