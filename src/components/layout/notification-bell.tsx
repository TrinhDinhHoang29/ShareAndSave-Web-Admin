import { Button } from "@/components/ui/button";
import { AlertCircle, Bell, Check, CheckCircle2, Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ✅ Type khai báo chuẩn
type NotificationType =
  | "user_registration"
  | "system_maintenance"
  | "report_generated"
  | "error_alert"
  | "new_message"
  | "permission_update";

type Notification = {
  id: number;
  sender_id: string;
  receiver_id: string;
  title: string;
  content: string;
  type: NotificationType;
  target_type: string;
  target_id: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      sender_id: "admin",
      receiver_id: "user123",
      title: "Người dùng mới đăng ký",
      content: "Có 3 người dùng mới đăng ký hệ thống trong ngày hôm nay",
      type: "user_registration",
      target_type: "users",
      target_id: "new_users",
      is_read: false,
      created_at: new Date(Date.now() - 2 * 60 * 1000),
      updated_at: new Date(Date.now() - 2 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 2,
      sender_id: "system",
      receiver_id: "user123",
      title: "Bảo trì hệ thống",
      content:
        "Hệ thống sẽ được bảo trì vào lúc 2:00 AM ngày mai. Vui lòng lưu công việc trước thời gian này.",
      type: "system_maintenance",
      target_type: "system",
      target_id: "maintenance_schedule",
      is_read: false,
      created_at: new Date(Date.now() - 15 * 60 * 1000),
      updated_at: new Date(Date.now() - 15 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 3,
      sender_id: "system",
      receiver_id: "user123",
      title: "Báo cáo hoàn thành",
      content: "Báo cáo doanh thu tháng 5/2025 đã được tạo thành công",
      type: "report_generated",
      target_type: "reports",
      target_id: "monthly_report_05_2025",
      is_read: true,
      created_at: new Date(Date.now() - 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 30 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 2,
      sender_id: "system",
      receiver_id: "user123",
      title: "Bảo trì hệ thống",
      content:
        "Hệ thống sẽ được bảo trì vào lúc 2:00 AM ngày mai. Vui lòng lưu công việc trước thời gian này.",
      type: "system_maintenance",
      target_type: "system",
      target_id: "maintenance_schedule",
      is_read: false,
      created_at: new Date(Date.now() - 15 * 60 * 1000),
      updated_at: new Date(Date.now() - 15 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 3,
      sender_id: "system",
      receiver_id: "user123",
      title: "Báo cáo hoàn thành",
      content: "Báo cáo doanh thu tháng 5/2025 đã được tạo thành công",
      type: "report_generated",
      target_type: "reports",
      target_id: "monthly_report_05_2025",
      is_read: true,
      created_at: new Date(Date.now() - 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 30 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 2,
      sender_id: "system",
      receiver_id: "user123",
      title: "Bảo trì hệ thống",
      content:
        "Hệ thống sẽ được bảo trì vào lúc 2:00 AM ngày mai. Vui lòng lưu công việc trước thời gian này.",
      type: "system_maintenance",
      target_type: "system",
      target_id: "maintenance_schedule",
      is_read: false,
      created_at: new Date(Date.now() - 15 * 60 * 1000),
      updated_at: new Date(Date.now() - 15 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 3,
      sender_id: "system",
      receiver_id: "user123",
      title: "Báo cáo hoàn thành",
      content: "Báo cáo doanh thu tháng 5/2025 đã được tạo thành công",
      type: "report_generated",
      target_type: "reports",
      target_id: "monthly_report_05_2025",
      is_read: true,
      created_at: new Date(Date.now() - 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 30 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 2,
      sender_id: "system",
      receiver_id: "user123",
      title: "Bảo trì hệ thống",
      content:
        "Hệ thống sẽ được bảo trì vào lúc 2:00 AM ngày mai. Vui lòng lưu công việc trước thời gian này.",
      type: "system_maintenance",
      target_type: "system",
      target_id: "maintenance_schedule",
      is_read: false,
      created_at: new Date(Date.now() - 15 * 60 * 1000),
      updated_at: new Date(Date.now() - 15 * 60 * 1000),
      deleted_at: null,
    },
    {
      id: 3,
      sender_id: "system",
      receiver_id: "user123",
      title: "Báo cáo hoàn thành",
      content: "Báo cáo doanh thu tháng 5/2025 đã được tạo thành công",
      type: "report_generated",
      target_type: "reports",
      target_id: "monthly_report_05_2025",
      is_read: true,
      created_at: new Date(Date.now() - 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 30 * 60 * 1000),
      deleted_at: null,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter(
    (n) => !n.is_read && !n.deleted_at
  ).length;

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

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true, updated_at: new Date() } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true, updated_at: new Date() }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, deleted_at: new Date() } : n))
    );
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "report_generated":
      case "permission_update":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "system_maintenance":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error_alert":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "user_registration":
      case "new_message":
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBorderColor = (type: NotificationType): string => {
    switch (type) {
      case "report_generated":
      case "permission_update":
        return "border-green-500";
      case "system_maintenance":
        return "border-yellow-500";
      case "error_alert":
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

  const activeNotifications = notifications.filter((n) => !n.deleted_at);

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
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 font-medium animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
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

          <div className="flex-1 overflow-y-auto  dark:bg-[var(--card)]">
            {activeNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Không có thông báo nào</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100  dark:bg-[var(--card)]">
                {activeNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 border-l-4  dark:bg-[var(--card)]  ${getNotificationBorderColor(
                      notification.type
                    )} ${!notification.is_read ? "bg-blue-50" : ""}`}
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
                                  !notification.is_read
                                    ? "text-gray-900 dark:text-gray-300"
                                    : "text-gray-700 dark:text-gray-100"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.is_read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p
                              className={`text-sm ${
                                !notification.is_read
                                  ? "text-gray-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {notification.content}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs text-gray-400">
                              <span>
                                {formatTimeAgo(notification.created_at)}
                              </span>
                              <span>Từ: {notification.sender_id}</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                                {notification.target_type}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            {!notification.is_read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Đánh dấu đã đọc"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-gray-400 hover:text-red-500"
                              title="Xóa thông báo"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeNotifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50 rounded-b-lg  dark:bg-[var(--card)]">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
