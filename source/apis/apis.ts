import axios from "axios";

const statusEndPoint = "https://api.mcsrvstat.us/3/"; //Put ip after .../3/ <-//

export default class Apis {
  /**
   * @param ip ip from server to get its status
   * @param port Optional, by default is 25565
   */
  static GetServerStatus(
    callBack: (serverInfo: ServerInfo) => void,
    ip: string,
    port: number = 25565
  ) {
    let aglo = statusEndPoint + ip + ":" + port;
    axios
      .get<ServerInfo>(statusEndPoint + ip + ":" + port)
      .then(response => callBack(response.data));
  }
}
