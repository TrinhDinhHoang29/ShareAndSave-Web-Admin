// hooks/use-chat-socket.ts
import { useAuth } from "@/context/auth-context";
import { interestKeys } from "@/hooks/react-query-hooks/use-interest";
import { getAccessToken } from "@/lib/token";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useNotificationSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const token = getAccessToken();
  const auth = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(`wss://shareandsave.io.vn/socketblablablablobloblo12345678/chat-noti`, token);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[✅] Connected to server noti");
    };

    socket.onmessage = (event) => {
      const parsed =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      console.log(parsed);
      if (
        parsed.event === "send_message_response" &&
        parsed.data.senderID !== auth.user?.id
      ) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: interestKeys.all,
          });
        }, 1000);
      }
    };

    socket.onclose = () => console.log("[❌] Socket closed");
    socket.onerror = (err) => console.error("[⚠️] Socket error", err);

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        // <-- This is important
        socket.close();
      }
    };
  }, [token]);

  return socketRef;
}
