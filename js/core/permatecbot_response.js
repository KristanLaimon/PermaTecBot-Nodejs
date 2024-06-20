"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotResponse {
    constructor() {
        this.responseFunct = null;
    }
    setReponse(funct) {
        this.responseFunct = ctx => {
            funct(ctx);
            this.responseFunct = null;
        };
    }
    call(ctx) {
        if (this.responseFunct)
            this.responseFunct(ctx);
    }
}
exports.default = BotResponse;
//# sourceMappingURL=permatecbot_response.js.map