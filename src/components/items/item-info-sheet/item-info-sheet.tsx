import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IItem } from "@/types/models/item.type";
import { CalendarDays, Clock, Hash, Package, Tag } from "lucide-react";

export default function ItemInfoSheet({ item }: { item: IItem }) {
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
    <div className="min-h-screen w-full overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6 pb-44">
        {/* Header */}
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                      {item.name}
                    </h1>
                    <div className="flex items-center gap-4 mt-1 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        <span>ID: {item.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {item.categoryName}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            {item.image && (
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    Hình ảnh sản phẩm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center p-4 bg-muted/50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full h-auto max-h-80 object-contain rounded-md"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Mô tả chi tiết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border-l-2 border-primary/50">
                  {item.description ||
                    "Chưa có mô tả chi tiết cho sản phẩm này."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Details Card */}

            {/* Stats Cards */}
            <div className="space-y-4">
              <Card className="border border-border bg-secondary/50">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-secondary/50 rounded-lg">
                      <Tag className="h-5 w-5 text-secondary-foreground" />
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1 truncate">
                    {item.categoryName}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Danh mục sản phẩm
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ID: {item.categoryID}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
