import ItemCard from "@/components/items/item-card";
import { IOldItem } from "@/components/posts/multi-form/step-3";
import { IItem } from "@/types/item.type";

function isSameItem(a: IOldItem, b: IOldItem): boolean {
  return a.id === b.id;
}

function hasItem(set: Set<IOldItem>, item: IOldItem): boolean {
  for (let i of set) {
    if (isSameItem(i, item)) return true;
  }
  return false;
}

function deleteItem(set: Set<IOldItem>, item: IOldItem): void {
  for (let i of set) {
    if (isSameItem(i, item)) {
      set.delete(i);
      break;
    }
  }
}

const ItemCardList = ({
  mockItems,
  selectedItems,
  setSelectedItems,
}: {
  mockItems: IItem[];
  selectedItems: Set<IOldItem>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<IOldItem>>>;
}) => {
  const toggleSelection = (item: IOldItem) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (hasItem(newSet, item)) {
        deleteItem(newSet, item);
      } else {
        item.quantity = 1;
        newSet.add(item);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={hasItem(selectedItems, item)}
              onToggle={() => toggleSelection(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCardList;
