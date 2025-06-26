import { useDeleteInterest } from "@/hooks/react-query-hooks/use-interest";
import { IInterest } from "@/types/models/interests.type";
import { PostType } from "@/types/status.type";
import { Clock, Heart, MessageCircle, Tag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const PostPill = ({
  authorAvatar,
  authorName,
  id,
  authorID,
  createdAt,
  title,
  description,
  interests,
  unreadMessageCount,
  type,
}: IInterest) => {
  const navigate = useNavigate();

  const handleMessage = () => {
    navigate(`/chats/${interests[0].id}`, {
      state: {
        user: {
          id: authorID,
          name: authorName,
          avatar: authorAvatar,
        },
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };
  const deleteInterestMutation = useDeleteInterest({
    onSuccess: () => {
      toast.success("Xóa quan tâm thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const { ask } = useConfirm();
  const handleDeleteInterest = async () => {
    const confirmed = await ask("Bạn có chắc chắn muốn xóa quan tâm này?");
    if (confirmed) {
      deleteInterestMutation.mutate(id);
    }
  };
  return (
    <div className="bg-gradient-to-r from-white  to-gray-50 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 p-5 mx-auto border border-gray-200 hover:border-blue-200 mb-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-14 h-14 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-3 flex gap-x-4 items-center">
              <h3 className="font-bold text-gray-900 text-base truncate leading-tight">
                {title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Tag className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-indigo-700 font-semibold px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-full border border-indigo-100">
                  {type === PostType.FOUND_ITEM
                    ? "Nhặt được đồ"
                    : type === PostType.GIVE_AWAY_OLD_ITEM
                    ? "Gửi lại đồ cũ"
                    : type === PostType.SEEK_LOST_ITEM
                    ? "Tìm kiếm đồ"
                    : "Khác"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteInterest}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${"text-red-600 bg-red-50 border border-red-200 shadow-md"}`}
                >
                  <Heart className={`w-5 h-5 fill-current`} />
                </button>

                <button
                  onClick={handleMessage}
                  className="flex items-center relative gap-2 px-4 py-2 rounded-full text-gray-500 bg-gray-50 border border-gray-200 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Nhắn tin</span>
                  {unreadMessageCount > 0 && (
                    <div className="flex justify-center absolute top-[-2px] right-[-10px]">
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
                        <span className="absolute text-white text-xs font-bold">
                          {unreadMessageCount}
                        </span>
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Author and time */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">
                {authorName}
              </span>
            </div>
            <span className="text-gray-300 text-sm">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed bg-gray-100 p-2 rounded-md">
              {description}
            </p>
          )}

          {/* Actions */}
        </div>
      </div>
    </div>
  );
};
export default PostPill;
