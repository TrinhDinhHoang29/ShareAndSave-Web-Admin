// hooks/use-chat-socket.ts
import { useAuth } from "@/context/auth-context";
import { interestKeys } from "@/hooks/react-query-hooks/use-interest";
import { messageKeys } from "@/hooks/react-query-hooks/use-message";
import { getAccessToken } from "@/lib/token";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useChatNotificationSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const token = getAccessToken();
  const auth = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(
      `wss://shareandsave.io.vn/socketblablablablobloblo12345678/chat-noti`,
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
      console.log("noti parsed", parsed);
      if (
        parsed.event === "send_message_response" &&
        parsed.data.senderID !== auth.user?.id
      ) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: interestKeys.all,
          });
          queryClient.invalidateQueries({
            queryKey: messageKeys.unread(),
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
