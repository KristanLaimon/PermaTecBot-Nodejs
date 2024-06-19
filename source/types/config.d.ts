interface ConfigJson {
  StartingDay: string;
  DatabasePath: string;
  SubscriptionsPath: string;
  BotMessages: BotMessage[];
  CommandsPath: string;
  ImagesPath: string;
  WatingReponseTimeSpan: number;
}

interface BotMessage {
  Title: string;
  Message: string;
}
