import LoadingSpinner from "@/components/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/react-query-hooks/use-users";
import { Order } from "@/types/filter-api.type";

export function RecentSales() {
  const userQuery = useUsers({
    limit: 5,
    page: 1,
    sort: "goodPoint",
    order: Order.DESC,
  });
  return (
    <div className="space-y-8">
      {userQuery.isLoading || !userQuery.data ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-8">
          {userQuery.data.clients.map((user) => (
            <div className="flex items-center" key={user.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.fullName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-medium">{user.goodPoint} Điểm</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
