import { Context } from "grammy";
import DbCache from "./db_cache";

const lastSubscriptionTime: Record<number, number> = {};

export const UserClickedSuscribedButton = (chatId: number, ctx: Context) => {
  const currentTime = Date.now();
  const timeLimit = DbCache.Config.WatingReponseTimeSpan;

  if (
    lastSubscriptionTime[chatId] &&
    currentTime - lastSubscriptionTime[chatId] < timeLimit
  ) {
    return true;
  }

  lastSubscriptionTime[chatId] = currentTime;

  return false;
};
