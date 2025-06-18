import { FilterForm } from "@/components/interests/filter-form";
import PostFollowed from "@/components/interests/post-followed/post-followed";
import PostPill from "@/components/interests/post-interest/post-interest";
import TabInterests from "@/components/interests/tab";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useInterests } from "@/hooks/react-query-hooks/use-interest";
import { Order } from "@/types/filter-api.type";
import { useState } from "react";

const InterestsPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<Order>(Order.DESC);
  // Limit of items per page
  const limit = 10;

  const getInterestsQuery = useInterests({
    page,
    limit,
    search,
    order,
    type: activeTab,
  });
  const handleFilter = (props: { searchValue: string; order: string }) => {
    setSearch(props.searchValue);
    setOrder(props.order as Order);
  };
  return (
    <Main>
      <div className="m-8">
        <div className="border p-8 rounded-md shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl dark:text-white font-bold text-gray-900">
              Danh sách quan tâm
            </h1>
            <p className="text-gray-500 mt-1  dark:text-white">
              Quản lý danh sách quan tâm của hệ thống, có thể nhấn tin hoặc hủy
              quan tâm trực tiếp tại đây.
            </p>
          </div>
          <div className="mb-6">
            <FilterForm onFilter={handleFilter} />
          </div>
          <div className="mb-6">
            <TabInterests activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {getInterestsQuery.isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="mb-6">
                {activeTab === 1 &&
                  getInterestsQuery.data?.interests.map((post, index) => (
                    <PostPill key={index} {...post} />
                  ))}
                {activeTab === 2 &&
                  getInterestsQuery.data?.interests.map((post, index) => (
                    <PostFollowed key={index} {...post} />
                  ))}
              </div>
              <div className="mb-6">
                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Trang trước
                  </Button>
                  <span className="self-center">Trang {page}</span>
                  <Button
                    variant="outline"
                    disabled={
                      getInterestsQuery.data?.totalPage
                        ? getInterestsQuery.data?.totalPage === page
                        : true
                    }
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Trang sau
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Main>
  );
};

export default InterestsPage;
