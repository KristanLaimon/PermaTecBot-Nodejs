import { Context } from "grammy";

const lastSubscriptionTime:Record<number, number> = {};

export const UserClickedSuscribedButton = (chatId: number, ctx: Context) => {
    const currentTime = Date.now();
    const timeLimit = 10000; 

    if (lastSubscriptionTime[chatId] && (currentTime - lastSubscriptionTime[chatId]) < timeLimit) {
        //ctx.reply("⏳ Por favor, espera 10 segundos antes de intentar suscribirte de nuevo. ⏳");
        return true;
    }

    lastSubscriptionTime[chatId] = currentTime;

    return false;
}