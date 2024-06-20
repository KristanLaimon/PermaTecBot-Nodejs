"use strict";
//Dependencies
Object.defineProperty(exports, "__esModule", { value: true });
const statusEndPoint = "https://api.mcsrvstat.us/3/"; //Put ip after .../3/ <-//
class Apis {
    /**
     * @param ip ip from server to get its status
     * @param port Optional, by default is 25565
     */
    static GetServerStatus(callBack, ip, port = 25565) {
        let fullRequestURL = statusEndPoint + ip + ":" + port;
        fetch(fullRequestURL)
            .then(response => response.json())
            .then(json => callBack(json));
    }
}
exports.default = Apis;
//# sourceMappingURL=apis.js.map