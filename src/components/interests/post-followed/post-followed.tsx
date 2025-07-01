import { IInterest } from "@/types/models/interests.type";
import { PostType } from "@/types/status.type";
import {
  ChevronDown,
  Clock,
  MessageCircle,
  NewspaperIcon,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const formatDate = (dateString: string) => {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
  return date.toLocaleDateString("vi-VN");
};
const PostFollowed = ({ title, interests, type }: IInterest) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const countUnread = interests.reduce(
    (acc, curr) => acc + curr.unreadMessageCount,
    0
  );
  const handleMessage = ({
    id,
    name,
    avatar,
    interestId,
  }: {
    id: number;
    name: string;
    avatar: string;
    interestId: number;
  }) => {
    navigate(`/chats/${interestId}`, {
      state: {
        user: {
          id,
          name,
          avatar,
        },
      },
    });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="border rounded-lg shadow-sm cursor-pointer"
      onClick={toggleDropdown}
    >
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Orange icon */}
            <div className="p-4 border rounded-full shadow-md ">
              <NewspaperIcon />
            </div>
            <div className="flex gap-x-2">
              <div className="text-lg font-semibold text-gray-900">{title}</div>

              <div className="flex items-center gap-1 flex-shrink-0">
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
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 relative bg-white px-3 py-2 border rounded-full shadow-sm">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">{interests.length}</span>
              {countUnread > 0 && (
                <div className="flex justify-center absolute top-[-2px] right-[-10px]">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
                    <span className="absolute text-white text-xs font-bold"></span>
                  </span>
                </div>
              )}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen &&
        interests.map((interest) => (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-4 m-8">
            <div className="p-2">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <img src={interest.userAvatar} alt="" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {interest.userName}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-x-2">
                    <Clock width={15} />{" "}
                    <span> {formatDate(interest.createdAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleMessage({
                      id: interest.userID,
                      name: interest.userName,
                      avatar: interest.userAvatar,
                      interestId: interest.id,
                    })
                  }
                  className="flex items-center relative gap-2 px-4 py-2 rounded-full text-gray-500 bg-gray-50 border border-gray-200 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Nhắn tin</span>
                  {interest.unreadMessageCount > 0 && (
                    <div className="flex justify-center absolute top-[-2px] right-[-10px]">
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
                        <span className="absolute text-white text-xs font-bold">
                          {interest.unreadMessageCount}
                        </span>
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostFollowed;
