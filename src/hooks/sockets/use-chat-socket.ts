// hooks/use-chat-socket.ts
import { useUpdateReadMessages } from "@/hooks/react-query-hooks/use-message";
import { IMessage } from "@/types/models/message.type";
import { useEffect, useRef } from "react";

export function useChatSocket(
  token: string | null,
  interestID: string | number | undefined,
  senderID: number,
  setCurrentMessage: React.Dispatch<React.SetStateAction<IMessage[]>>
) {
  const socketRef = useRef<WebSocket | null>(null);
  const updateReadMessageMutation = useUpdateReadMessages();
  useEffect(() => {
    if (!token || !interestID) return;

    const socket = new WebSocket(`ws://34.142.168.171:8001/chat`, token);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[✅] Connected to server chat");
      const joinMsg = {
        event: "join_room",
        data: {
          interestID: Number(interestID),
        },
      };

      socket.send(JSON.stringify(joinMsg));
    };

    socket.onmessage = (event) => {
      const parsed =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      console.log(event);
      if (
        parsed.event === "send_message_response" &&
        parsed.data.senderID !== senderID
      ) {
        setCurrentMessage((prev) => [
          {
            message: parsed.data.message,
            createdAt: parsed.data.timestamp,
            senderID: parsed.data.senderID,
          },
          ...prev,
        ]);
      }
      updateReadMessageMutation.mutate({ interestId: Number(interestID) });
      console.log(updateReadMessageMutation.data);
    };

    socket.onclose = () => console.log("[❌] Socket closed");
    socket.onerror = (err) => console.error("[⚠️] Socket error", err);

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        // <-- This is important
        socket.close();
      }
    };
  }, [token, interestID]);

  return socketRef;
}
