// hooks/use-chat-socket.ts
import { notificationKeys } from "@/hooks/react-query-hooks/use-notification";
import { getAccessToken } from "@/lib/token";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useNotificationSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const token = getAccessToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(
      `wss://shareandsave.io.vn/socketblablablablobloblo12345678/noti`,
      token
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[✅] Connected to server noti");
    };
    const pingInterval = setInterval(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        console.log("đã ping");
        socketRef.current.send(
          JSON.stringify({
            event: "ping",
            data: {},
          })
        );
      }
    }, 30_000); // 30 giây
    socket.onmessage = (event) => {
      const parsed =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;

      if (parsed.event === "receive_noti_response") {
        console.log("đã vào");
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: notificationKeys.all,
          });
        }, 1000);
      }
    };

    socket.onclose = () => console.log("[❌] Socket closed");
    socket.onerror = (err) => console.error("[⚠️] Socket error", err);

    return () => {
      clearInterval(pingInterval);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        // <-- This is important
        socket.close();
      }
    };
  }, [token]);

  return socketRef;
}
