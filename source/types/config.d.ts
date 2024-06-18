interface Config {
  StartingDay: string;
  DatabasePath: string;
  SubscriptionsPath: string;
  BotMessages: BotMessage[];
}

interface BotMessage {
  Title: string;
  Message: string;
}
