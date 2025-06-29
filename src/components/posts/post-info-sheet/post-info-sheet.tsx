import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/types/models/post.type";
import { PostStatus, PostType } from "@/types/status.type";
import { CalendarDays, Heart, Package, Tag, User } from "lucide-react";

// Helper functions
const getStatusText = (status: PostStatus) => {
  switch (status) {
    case PostStatus.PENDING:
      return "Đang chờ";
    case PostStatus.REJECTED:
      return "Từ chối";
    case PostStatus.APPROVED:
      return "Đã duyệt";
    default:
      return "Không xác định";
  }
};

const getStatusColor = (status: PostStatus) => {
  switch (status) {
    case PostStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case PostStatus.REJECTED:
      return "bg-red-100 text-red-800";
    case PostStatus.APPROVED:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeText = (type: PostType) => {
  switch (type) {
    case PostType.GIVE_AWAY_OLD_ITEM:
      return "Tặng đồ cũ";
    case PostType.FOUND_ITEM:
      return "Tìm thấy đồ";
    case PostType.SEEK_LOST_ITEM:
      return "Tìm đồ thất lạc";
    case PostType.WANT_OLD_ITEM:
      return "Muốn nhận lại đồ cũ";
    case PostType.CAMPAIGN:
      return "Chiến dịch";
    case PostType.OTHER:
      return "Khác";
    default:
      return "Không xác định";
  }
};

const getTypeColor = (type: PostType) => {
  switch (type) {
    case PostType.GIVE_AWAY_OLD_ITEM:
      return "bg-blue-100 text-blue-800";
    case PostType.FOUND_ITEM:
      return "bg-green-100 text-green-800";
    case PostType.SEEK_LOST_ITEM:
      return "bg-orange-100 text-orange-800";
    case PostType.OTHER:
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Sample data

export default function PostInfoSheet({ post }: { post: IPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={getTypeColor(post.type)}>
                {getTypeText(post.type)}
              </Badge>
              <Badge className={getStatusColor(post.status)}>
                {getStatusText(post.status)}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mô tả</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {post.description}
              </p>
            </CardContent>
          </Card>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hình ảnh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Hình ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Items */}
          {post.items && post.items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Danh sách vật phẩm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {post.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md border flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block truncate">
                          {item.name}
                        </span>
                        <div>Số lượng: {item.quantity}</div>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        {item.categoryName}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin thêm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {post.content || "Không có"}
              </p>
            </CardContent>
          </Card>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Thẻ tag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interests */}
          {post.interests && post.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Người quan tâm ({post.interests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {post.interests.map((interest) => (
                    <div key={interest.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={interest["authorAvatar"]}
                          alt={interest?.userName}
                        />
                        <AvatarFallback>
                          {interest?.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {interest?.userName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Post Meta */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin bài đăng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-mono">#{post.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Slug:</span>
                <span className="font-mono text-xs">{post.slug}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
