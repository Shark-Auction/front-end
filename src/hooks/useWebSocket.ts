import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import SockJS from "sockjs-client";

const URL = "http://128.199.193.209:8080/ws";

export const useWebSocket = () => {
  const sock = () => new SockJS(URL);
  const client = Stomp.over(sock);
  useEffect(() => {
    return () => {
      client.disconnect = () => {}
    }
  })
  return { client };
};
