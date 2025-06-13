import { http } from "@/lib/http";
import { IFilterApi, Order } from "@/types/filter-api.type";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

export const mockItemWarehouses: IItemWarehouse[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i + 1,
    imageItem: `https://picsum.photos/seed/item-${i}/80/80`, // ảnh giả
    nameItem: `Sản phẩm số ${i + 1}`,
    categoryName: ["Điện tử", "Thời trang", "Gia dụng"][i % 3],
    code: `SP-${1000 + i}`,
    description: `Mô tả cho sản phẩm số ${i + 1}`,
    createdAt: new Date().toISOString(),
  })
);
const getItemWarehouses = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page = 1,
  limit = 10,
}: IFilterApi): Promise<
  IResponseApi<{ itemWarehouses: IItemWarehouse[]; totalPage: number }>
> => {
  const start = (page - 1) * limit;
  const end = start + limit;

  let filtered = mockItemWarehouses;

  if (searchBy && searchValue) {
    filtered = filtered.filter((item) =>
      (item as any)[searchBy]
        ?.toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    const fieldA = (a as any)[sort || "id"];
    const fieldB = (b as any)[sort || "id"];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return order === Order.DESC
        ? fieldB.localeCompare(fieldA)
        : fieldA.localeCompare(fieldB);
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return order === Order.DESC ? fieldB - fieldA : fieldA - fieldB;
    }

    return 0; // fallback nếu không thể so sánh
  });

  const itemWarehouses = sorted.slice(start, end);

  return {
    data: {
      itemWarehouses,
      totalPage: Math.ceil(filtered.length / limit),
    },
    message: "Success",
    code: 200,
  };
};

export { getItemWarehouses };
