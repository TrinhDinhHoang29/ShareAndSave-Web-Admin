import { Button } from "@/components/ui/button";

import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Main } from "@/components/layout/main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@radix-ui/react-select";
import { useState } from "react";
import { useAllStatistics } from "@/hooks/react-query-hooks/use-statisitc";
import LoadingSpinner from "@/components/loading-spinner";
import {
  IconArrowsLeftRight,
  IconBuildingWarehouse,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";

export default function Dashboard() {
  const currentYear = new Date().getFullYear();
  // Số năm muốn hiển thị (ví dụ 10 năm trở lại đây)
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  // State chọn năm
  const [year, setYear] = useState(currentYear.toString());

  const statistics = useAllStatistics();

  const [transactionStats, userStats, postStats, itemWarehouseStats] =
    statistics.map((q) => q.data);
  return (
    <>
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>

        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Phân tích
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Báo cáo
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Thông báo
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.some((q) => q.isLoading) ? (
                <LoadingSpinner />
              ) : (
                <>
                  {/* Tổng giao dịch */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-sm font-medium">
                        Tổng giao dịch
                      </CardTitle>
                      {/* ...icon... */}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center gap-x-2">
                        <IconArrowsLeftRight />
                        {statistics[0]?.data?.total?.toLocaleString() ?? 0}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {`+ ${
                          statistics[0]?.data?.totalLastMonth?.toLocaleString() ??
                          0
                        } từ tháng trước`}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Tổng người dùng */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-sm font-medium">
                        Tổng người dùng
                      </CardTitle>
                      {/* ...icon... */}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold  flex items-center gap-x-2">
                        <IconUser />
                        {statistics[1]?.data?.total?.toLocaleString() ?? 0}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {`+ ${
                          statistics[1]?.data?.totalLastMonth?.toLocaleString() ??
                          0
                        } từ tháng trước`}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Tổng bài viết */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tổng bài viết
                      </CardTitle>
                      {/* ...icon... */}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold  flex items-center gap-x-2">
                        <IconPencil />
                        {statistics[2]?.data?.total?.toLocaleString() ?? 0}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {`+ ${
                          statistics[2]?.data?.totalLastMonth?.toLocaleString() ??
                          0
                        } từ tháng trước`}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Tổng hàng tồn kho */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tổng hàng tồn kho
                      </CardTitle>
                      {/* ...icon... */}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold  flex items-center gap-x-2">
                        <IconBuildingWarehouse />
                        {statistics[3]?.data?.total?.toLocaleString() ?? 0}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {`+ ${
                          statistics[3]?.data?.totalLastMonth?.toLocaleString() ??
                          0
                        } từ tháng trước`}
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <div>Tổng giao dịch trong 12 tháng </div>
                    <div className="flex items-center">
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chọn năm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {years.map((y) => (
                              <SelectItem key={y} value={y.toString()}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview year={year} />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Danh sách người có điểm cao nhất</CardTitle>
                  <CardDescription>
                    Đây là những thành viên có đóng góp nhiều nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}
