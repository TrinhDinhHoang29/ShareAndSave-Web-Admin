import { IFilterApi, Order } from "@/types/filter-api.type";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { IWarehouse } from "@/types/models/warehouse.type";
import { IResponseApi } from "@/types/response-api.type";
import { ClassifyWarhouse } from "@/types/status.type";
const mockItemWarehouse = (
  parentIndex: number,
  itemIndex: number
): IItemWarehouse => ({
  id: parentIndex * 10 + itemIndex,
  imageItem: `https://picsum.photos/seed/${parentIndex}-${itemIndex}/100/100`,
  nameItem: `Sản phẩm ${parentIndex}-${itemIndex}`,
  categoryName: itemIndex % 2 === 0 ? "Điện tử" : "Gia dụng",
  code: `ITEM-${parentIndex}-${itemIndex}`,
  description: `Mô tả cho item ${parentIndex}-${itemIndex}`,
  status: itemIndex % 2 === 0 ? 1 : 2,
});

export const mockWarehouses: IWarehouse[] = Array.from(
  { length: 20 },
  (_, i) => {
    const itemCount = Math.floor(Math.random() * 3) + 2; // 2–4 items
    const items: IItemWarehouse[] = Array.from({ length: itemCount }, (_, j) =>
      mockItemWarehouse(i + 1, j + 1)
    );

    return {
      id: i + 1,
      sku: `SKU-${1000 + i}`,
      quantity: Math.floor(Math.random() * 1000),
      description: `Hàng hóa mô tả số ${i + 1}`,
      senderName: `Người gửi ${i + 1}`,
      reciverName: `Người nhận ${i + 1}`,
      classify:
        i % 2 === 0 ? ClassifyWarhouse.LOSE_ITEM : ClassifyWarhouse.OLD_ITEM,
      stockPlace: `Kho số ${(i % 5) + 1}`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000000000)
      ).toISOString(),
      itemWarehouses: items,
    };
  }
);

const getWarehouses = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page = 1,
  limit = 10,
}: IFilterApi): Promise<
  IResponseApi<{ warehouses: IWarehouse[]; totalPage: number }>
> => {
  const filtered = mockWarehouses.filter((w) =>
    searchValue
      ? w[searchBy as keyof IWarehouse]
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase())
      : true
  );

  const sorted = filtered.sort((a, b) => {
    const fieldA = a[sort as keyof IWarehouse];
    const fieldB = b[sort as keyof IWarehouse];
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return order === Order.ASC
        ? fieldB.localeCompare(fieldA)
        : fieldA.localeCompare(fieldB);
    }
    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return order === Order.DESC ? fieldB - fieldA : fieldA - fieldB;
    }
    return 0;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = sorted.slice(start, end);

  return {
    data: {
      warehouses: paginated,
      totalPage: Math.ceil(filtered.length / limit),
    },
    code: 200,
    message: "Success",
  };
};

export const getWarehouse = async (
  id: number
): Promise<{ warehouse: IWarehouse }> => {
  const warehouse = mockWarehouses.find((w) => w.id === id);

  if (!warehouse) {
    throw new Error(`Warehouse with id ${id} not found`);
  }

  return { warehouse };
};
export { getWarehouses };
