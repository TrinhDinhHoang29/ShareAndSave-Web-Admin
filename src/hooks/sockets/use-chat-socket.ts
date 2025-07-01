// hooks/use-chat-socket.ts
import { useUpdateReadMessages } from '@/hooks/react-query-hooks/use-message';
import { IMessage } from '@/types/models/message.type';
import { useEffect, useRef } from 'react';

export function useChatSocket(
  token: string | null,
  interestID: string | number | undefined,
  senderID: number,
  setCurrentMessage: React.Dispatch<React.SetStateAction<IMessage[]>>,
  refetch: any,
  interestQueryRefetch: any
) {
  const socketRef = useRef<WebSocket | null>(null);
  const updateReadMessageMutation = useUpdateReadMessages();
  useEffect(() => {
    if (!token || !interestID) return;

    const socket = new WebSocket(`wss://shareandsave.io.vn/socketblablablablobloblo12345678/chat`, token);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('[✅] Connected to server chat');
      const joinMsg = {
        event: 'join_room',
        data: {
          interestID: Number(interestID),
        },
      };

      socket.send(JSON.stringify(joinMsg));
    };

    socket.onmessage = (event) => {
      const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      console.log(event);
      console.log('parsed.event', parsed.event);

      if (parsed.event === 'send_message_response' && parsed.data.senderID !== senderID) {
        setCurrentMessage((prev) => [
          {
            message: parsed.data.message,
            createdAt: parsed.data.timestamp,
            senderID: parsed.data.senderID,
          },
          ...prev,
        ]);
      } else if (parsed.event == 'send_transaction_response') {
        console.log('vào đây');
        refetch();
        interestQueryRefetch();
      }
      updateReadMessageMutation.mutate({ interestId: Number(interestID) });
    };

    socket.onclose = () => console.log('[❌] Socket closed');
    socket.onerror = (err) => console.error('[⚠️] Socket error', err);

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        // <-- This is important
        const msg = {
          event: 'left_room',
          data: {
            interestID: Number(interestID),
          },
        };
        socketRef.current.send(JSON.stringify(msg));
        socket.close();
      }
    };
  }, [token, interestID]);

  return socketRef;
}
