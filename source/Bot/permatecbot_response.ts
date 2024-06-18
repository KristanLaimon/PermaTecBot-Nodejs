import { Context } from "grammy";

type BotEvent = (ctx: Context) => void;

export default class BotResponse {
  responseFunct: BotEvent | null = null;

  setReponse(funct: BotEvent) {
    this.responseFunct = ctx => {
      funct(ctx);
      this.responseFunct = null;
    };
  }

  call(ctx: Context) {
    if (this.responseFunct) this.responseFunct(ctx);
  }
}
