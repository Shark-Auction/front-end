import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import SockJS from "sockjs-client";

const URL = "http://api.sharkauction.online/ws";

export const useWebSocket = () => {
  const sock = () => new SockJS(URL);
  const client = Stomp.over(sock);
  useEffect(() => {
    client.debug = () => {}
    return () => {
      client.disconnect = () => {}
    }
  })
  return { client };
};
