import { ChatUser } from "@/components/chats/data/chat-types";
import { Main } from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconPaperclip,
  IconPhotoPlus,
  IconPlus,
  IconSend,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
// Fake Data
import ItemCard from "@/components/chats/item-card/item-card";
import PopupCreateTransaction from "@/components/chats/popup-create-transaction/popup-create-transaction";
import PopupUpdateTransaction from "@/components/chats/popup-update-transaction/popup-update-transaction";
import LoadingSpinner from "@/components/loading-spinner";
import { useAuth } from "@/context/auth-context";
import { useInterest } from "@/hooks/react-query-hooks/use-interest";
import { useMessages } from "@/hooks/react-query-hooks/use-message";
import {
  useCreateTransaction,
  useGetTransactions,
} from "@/hooks/react-query-hooks/use-transaction";
import { useChatSocket } from "@/hooks/sockets/use-chat-socket";
import { getAccessToken } from "@/lib/token";
import { IMessage } from "@/types/models/message.type";
import { DeliveryMethod } from "@/types/status.type";
import { format } from "date-fns";
import { Package } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
export type SelectedItem = {
  postItemID: number;
  quantity: number;
  name: string;
  image: string;
  currentQuantity: number;
};
export default function Chats() {
  const params = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  const userAuth = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1);

  const [selectedItem, setSelectedItem] = useState<SelectedItem[]>([]);
  const interestQuery = useInterest(params.interestId as string);
  const getTransactionsQuery = useGetTransactions({
    limit: 100,
    searchBy: "interestID",
    searchValue: params.interestId as string,
  });

  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(
    null
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentMessage, setCurrentMessage] = useState<IMessage[]>([]);
  const [limit, setLimit] = useState(10);
  const { data, isPending } = useMessages({
    interestID: Number(params.interestId),
    limit: limit,
  });
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.clientHeight + container.scrollTop;
    if (isAtBottom <= 10) {
      setLimit((prev) => prev + 10);
    }
  };
  useEffect(() => {
    if (data) {
      setCurrentMessage(data.messages);
    }
  }, [data]);

  const accessToken = getAccessToken();
  const socketRef = useChatSocket(
    accessToken,
    params.interestId,
    userAuth.user?.id as number,
    setCurrentMessage
  );

  const createTransactionMutation = useCreateTransaction({
    onSuccess: () => {
      setSelectedItem([]);
      setIsOpen(false);
      toast.success("Bạn hoàn tất tạo phiếu xác nhận");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const handleCreateTransaction = () => {
    createTransactionMutation.mutate({
      interestID: Number(params.interestId),
      method:
        activeTab === 1 ? DeliveryMethod.DELIVERY : DeliveryMethod.MEETINPERSON,
      items: selectedItem.map((item) => ({
        postItemID: item.postItemID,
        quantity: item.quantity,
      })),
    });
  };

  const handleSelectedItem = (item: SelectedItem) => {
    setSelectedItem((prev) => {
      const existingItem = prev.find((i) => i.postItemID === item.postItemID);
      if (existingItem) {
        return prev.filter((i) => i.postItemID !== item.postItemID);
      }
      return [...prev, item];
    });
  };

  const handleChangeQuantity = (item: SelectedItem) => {
    setSelectedItem((prev) => {
      const existingItem = prev.find((i) => i.postItemID === item.postItemID);
      if (existingItem) {
        return prev.map((i) =>
          i.postItemID === item.postItemID
            ? { ...i, quantity: item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      if (!inputMessage.trim()) return;
      socketRef.current.send(
        JSON.stringify({
          event: "send_message",
          data: {
            isOwner:
              userAuth.user?.id === interestQuery.data?.interest.authorID,
            interestID: Number(params.interestId),
            userID: user.id,
            message: inputMessage,
          },
        })
      );
      setCurrentMessage((prev) => [
        {
          message: inputMessage,
          createdAt: `${new Date()}`,
          senderID: userAuth.user!.id,
        },
        ...prev,
      ]);
      setInputMessage("");
    }
  };

  return (
    <>
      <Main fixed>
        {interestQuery.isLoading || !interestQuery.data ? (
          <LoadingSpinner />
        ) : (
          <>
            <section className="flex h-full gap-2">
              {/* Left Side */}
              <div className="flex w-full flex-col sm:w-90 border rounded-t-md overflow-hidden shadow-md">
                <div className="bg-secondary rounded-t-md  sticky top-0 z-10 -mx-4 px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 ">
                  <div className="flex items-center justify-between p-6 relative">
                    <div className="flex gap-2 ">
                      <h1 className="text-2xl font-bold">Vật phẩm có sẳn</h1>
                      <Package size={20} />
                    </div>
                  </div>
                </div>

                <ScrollArea className="-mx-3 h-full p-3">
                  <div className="mx-4 mb-20 mt-2">
                    {interestQuery.data.interest.items.map((item) => (
                      <ItemCard
                        disabled={
                          userAuth.user?.id ===
                          interestQuery.data.interest.authorID
                        }
                        {...item}
                        key={item.id}
                        seletectedItems={selectedItem}
                        handleSelectedItem={handleSelectedItem}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Right Side */}

              <div
                className={cn(
                  "bg-primary-foreground absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex",
                  mobileSelectedUser && "left-0 flex"
                )}
              >
                {/* Top Part */}
                <div className="bg-secondary mb-1 flex flex-none justify-between rounded-t-md p-4 shadow-lg">
                  {/* Left */}
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="-ml-2 h-full sm:hidden"
                      onClick={() => setMobileSelectedUser(null)}
                    >
                      <IconArrowLeft />
                    </Button>
                    <div className="flex items-center gap-2 lg:gap-4">
                      <Avatar className="size-9 lg:size-11">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="col-start-2 row-span-2 text-sm font-medium lg:text-base">
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-1">
                    {selectedItem.length > 0 && (
                      <PopupCreateTransaction
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        handleCreateTransaction={handleCreateTransaction}
                        items={selectedItem}
                        handleChangeQuantity={handleChangeQuantity}
                        handleClose={handleSelectedItem}
                      />
                    )}
                    {getTransactionsQuery.isSuccess && (
                      <PopupUpdateTransaction
                        transactions={getTransactionsQuery.data.transactions}
                      />
                    )}
                  </div>
                </div>

                {/* Conversation */}
                <div className="flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4">
                  <div className="flex size-full flex-1">
                    <div className="chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden">
                      <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pr-4 pb-4"
                      >
                        {(!isPending || !data) &&
                          currentMessage.map((msg, index) => (
                            <div
                              key={`${msg.senderID}-${msg.createdAt}-${index}`}
                              className={cn(
                                "chat-box max-w-72 px-3 py-2 break-words shadow-lg",
                                msg.senderID === userAuth.user?.id
                                  ? "bg-primary/85 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]"
                                  : "bg-secondary self-start rounded-[16px_16px_16px_0]"
                              )}
                            >
                              {msg.message}{" "}
                              <span
                                className={cn(
                                  "text-muted-foreground mt-1 block text-xs font-light italic",
                                  msg.senderID === userAuth.user?.id &&
                                    "text-right"
                                )}
                              >
                                {msg.createdAt &&
                                !isNaN(new Date(msg.createdAt).getTime())
                                  ? format(new Date(msg.createdAt), "h:mm a")
                                  : "Invalid date"}
                              </span>
                            </div>
                          ))}
                        {/* <div className="text-center text-xs">{key}</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-none gap-2">
                    <div className="border-input focus-within:ring-ring flex flex-1 items-center gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4">
                      <div className="space-x-1">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="h-8 rounded-md"
                        >
                          <IconPlus
                            size={20}
                            className="stroke-muted-foreground"
                          />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="hidden h-8 rounded-md lg:inline-flex"
                        >
                          <IconPhotoPlus
                            size={20}
                            className="stroke-muted-foreground"
                          />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="hidden h-8 rounded-md lg:inline-flex"
                        >
                          <IconPaperclip
                            size={20}
                            className="stroke-muted-foreground"
                          />
                        </Button>
                      </div>
                      <label className="flex-1">
                        <span className="sr-only">Chat Text Box</span>
                        <input
                          value={inputMessage}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                              // Gọi hàm gửi tin nhắn ở đây
                            }
                          }}
                          onChange={(e) => setInputMessage(e.target.value)}
                          type="text"
                          placeholder="Type your messages..."
                          className="h-8 w-full bg-inherit focus-visible:outline-hidden"
                        />
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:inline-flex"
                        onClick={handleSendMessage}
                        disabled={inputMessage.length === 0}
                      >
                        <IconSend size={20} />
                      </Button>
                    </div>
                    <Button className="h-full sm:hidden">
                      <IconSend size={18} /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Main>
    </>
  );
}
// const moderateConversation = async (content: string): Promise<string> => {
//   const prompt = `
// Bạn là một trợ lý AI kiểm duyệt nội dung cuộc trò chuyện giữa người dùng.

// Dưới đây là nội dung hội thoại (giữa nhiều người, có thể là hỏi/đáp, trao đổi...):

// ---
// ${content}
// ---

// Hãy kiểm tra xem hội thoại này có chứa nội dung **không phù hợp** như:
// - Buôn bán trái phép (ma túy, vũ khí, giấy tờ giả...)
// - Nói tục, thô tục, xúc phạm, bạo lực
// - Spam, lừa đảo, khiêu dâm, kích động thù ghét

// Nếu **có vi phạm**, hãy trả lời:
// ⚠️ Nội dung cuộc trò chuyện có dấu hiệu không phù hợp, vui lòng giữ lịch sự và tuân thủ quy định.

// Nếu **không có vi phạm**, chỉ trả lời:
// OK
// `;

//   try {
//     const res = await aiGenerate(prompt);
//     console.log("trả lời từ AI là: ", res);
//     return res || "OK";
//   } catch (err) {
//     console.error("Moderation error:", err);
//     return "OK";
//   }
// };
