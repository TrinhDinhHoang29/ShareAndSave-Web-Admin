import { SelectedItem } from "@/pages/_authenticated/chats";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";

export interface IItemCardProps {
  disabled: boolean;
  currentQuantity: number;
  id: number;
  image: string;
  itemID: number;
  name: string;
  quantity: number;
  categoryName: string;
  seletectedItems: SelectedItem[];
  handleSelectedItem: (item: SelectedItem) => void;
}

const ItemCard = ({
  disabled,
  currentQuantity,
  quantity,
  image,
  name,
  categoryName,
  seletectedItems,
  id,
  handleSelectedItem,
}: IItemCardProps) => {
  const handleClick = () => {
    if (disabled) return;
    if (currentQuantity > 0) {
      handleSelectedItem({
        quantity: 1,
        image,
        name,
        postItemID: id, // Assuming id is the same as itemID
        currentQuantity,
      });
    } else {
      toast.error("Món đồ hiện tại đã hết");
    }
  };

  return (
    <div
      className="bg-white relative rounded-2xl p-4 shadow-sm border border-gray-300 max-w-sm mb-2 cursor-pointer hover:shadow-lg  hover:transition-shadow   hover:bg-gray-200 hover:duration-200"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt=""
                width={"100%"}
                height={"100%"}
                className="rounded-full"
              />
              <span className="absolute text-[12px]  text-white font-bold bg-blue-400 px-1 rounded-full bottom-0 right-0">
                {quantity}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-2">{name}</h3>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              {categoryName}
            </span>

            {currentQuantity > 0 ? (
              <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                Còn {currentQuantity}
              </span>
            ) : (
              <span className="bg-red-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                Hết hàng
              </span>
            )}
          </div>
        </div>
      </div>
      {seletectedItems.some((item) => item.postItemID === id) && (
        <span className="absolute top-[-4px] right-[-4px] text-white bg-green-400 rounded-full">
          <CircleCheck />
        </span>
      )}
    </div>
  );
};

export default ItemCard;
