import { SelectedItem } from "@/pages/_authenticated/chats";
import { Minus, Plus, X } from "lucide-react";

const ItemPill = (props: {
  postItemID: number;
  quantity: number;
  name: string;
  image: string;
  currentQuantity: number;
  handleSelectedItem: (item: SelectedItem) => void;
  handleClose: (item: SelectedItem) => void;
}) => {
  const handleIncrease = () => {
    const newQuantity = props.quantity + 1;

    props.handleSelectedItem({
      postItemID: props.postItemID,
      quantity: newQuantity,
      name: props.name,
      image: props.image,
      currentQuantity: props.currentQuantity,
    });
  };

  const handleDecrease = () => {
    if (props.quantity > 1) {
      const newQuantity = props.quantity - 1;
      props.handleSelectedItem({
        postItemID: props.postItemID,
        quantity: newQuantity,
        name: props.name,
        image: props.image,
        currentQuantity: props.currentQuantity,
      });
    }
  };
  return (
    <div className="rounded-lg shadow-lg p-4 max-w-md mx-auto mb-4 flex items-center gap-4 relative bg-gray-200 w-full">
      {/* Hình ảnh sản phẩm */}
      <div className="w-12 h-12 bg-black bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
        <img
          src={props.image}
          alt={props.name}
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium  text-sm truncate">{props.name}</h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-opacity-80">Số lượng yêu cầu:</span>

          {/* Nút điều khiển số lượng */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={props.quantity <= 1}
              className="w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
            >
              <Minus
                size={12}
                className={props.quantity <= 1 ? " text-opacity-40" : ""}
              />
            </button>

            <span className=" font-bold min-w-[20px] text-center">
              {props.quantity}
            </span>

            <button
              onClick={handleIncrease}
              disabled={props.quantity === props.currentQuantity}
              className="w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200"
            >
              <Plus
                size={12}
                className={
                  props.quantity === props.currentQuantity
                    ? " text-opacity-40"
                    : ""
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Nút đóng */}
      <button
        onClick={() =>
          props.handleClose({
            postItemID: props.postItemID,
            quantity: props.quantity,
            name: props.name,
            image: props.image,
            currentQuantity: props.currentQuantity,
          })
        }
        className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
      >
        <X size={16} className="text-white" />
      </button>
    </div>
  );
};

export default ItemPill;
