import ItemCard from "@/components/items/item-card";
import { IOldItem } from "@/components/posts/multi-form/step-3";
import { IItem } from "@/types/models/item.type";

const ItemCardList = ({
  mockItems,
  setSelectedItem,
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mockItems: IItem[];
  setSelectedItem: React.Dispatch<React.SetStateAction<IOldItem | null>>;
}) => {
  const toggleSelection = (item: IOldItem) => {
    setSelectedItem(item);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={() => toggleSelection(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCardList;
