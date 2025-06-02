import {
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  XCircleIcon,
} from "lucide-react";

export function StatusSummary() {
  const summaryItems = [
    {
      icon: <FileTextIcon className="h-6 w-6 text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      label: "Tổng bài đăng",
      value: 124,
    },
    {
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      label: "Đang xử lý",
      value: 28,
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      label: "Đã duyệt",
      value: 86,
    },
    {
      icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
      bg: "bg-red-50 dark:bg-red-900/20",
      label: "Từ chối",
      value: 10,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[var(--card)] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-[var(--border)]"
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-md ${item.bg}`}>{item.icon}</div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
