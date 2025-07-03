import { Button } from "@/components/ui/button";
import {
  useNotification,
  useUpdateReadNotitication,
} from "@/hooks/react-query-hooks/use-notification";
import { INotification } from "@/types/models/notification.type";
import { TargetTypeNotification, TypeNotification } from "@/types/status.type";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ✅ Type khai báo chuẩn

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useNotification({
    /* params nếu có */
    limit: 4,
  });

  // Nối các page lại thành mảng 1 chiều
  const notifications: INotification[] =
    data?.pages.flatMap((page) => page.notifications) || [];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const updateReadNotificationMutation = useUpdateReadNotitication();
  const unreadCount = data?.pages?.[0]?.unreadCount ?? 0;
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const isAtBottom =
      container.clientHeight + container.scrollTop === container.scrollHeight;
    if (isAtBottom && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAllAsRead = () => {
    updateReadNotificationMutation.mutate();
    refetch();
  };

  const getNotificationIcon = (type: TypeNotification) => {
    switch (type) {
      case "normal":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "system":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBorderColor = (type: TypeNotification): string => {
    switch (type) {
      case TypeNotification.NORMAL:
        return "border-green-500";
      case TypeNotification.SYSTEM:
        return "border-red-500";
      default:
        return "border-blue-500";
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        onClick={toggleDropdown}
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <Bell className="size-[1.2rem]" />

        {unreadCount > 0 && (
          <div className="flex justify-center absolute -top-1 -right-1">
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
              <span className="absolute text-white text-xs font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </span>
          </div>
        )}
      </Button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-96 bg-white  dark:bg-[var(--card)] rounded-lg shadow-lg border z-50 max-h-96 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-[var(--card)] rounded-t-lg">
            <h3 className="text-lg font-semibold ">Thông báo</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Đánh dấu tất cả đã đọc
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto  dark:bg-[var(--card)]"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Không có thông báo nào</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100  dark:bg-[var(--card)]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 border-l-4  dark:bg-[var(--card)]  ${getNotificationBorderColor(
                      notification.type
                    )} ${!notification.isRead ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={`text-sm font-medium ${
                                  !notification.isRead
                                    ? "text-gray-900 dark:text-gray-300"
                                    : "text-gray-700 dark:text-gray-100"
                                }`}
                              >
                                {notification.type === TypeNotification.NORMAL
                                  ? "Thông báo thông thường"
                                  : "Thông báo hệ thống"}
                              </h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p
                              className={`text-sm ${
                                !notification.isRead
                                  ? "text-gray-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {notification.content}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs text-gray-400">
                              <span>
                                {formatTimeAgo(
                                  new Date(notification.createdAt)
                                )}
                              </span>
                              <span>
                                Từ: {notification.senderName || "Bạn"}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                                {notification.targetType ===
                                TargetTypeNotification.APPOINTMENT
                                  ? "Cuộc hẹn"
                                  : "Giao dịch"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isFetchingNextPage && (
                  <div className="flex justify-center">
                    <Loader2 className={`text-gray-300 h-8 w-8 animate-spin`} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
