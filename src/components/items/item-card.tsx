import { Check } from "lucide-react";

const ItemCard = ({ item, onToggle }: any) => {
  return (
    <div
      onClick={onToggle}
      role="button"
      aria-pressed={false}
      className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 overflow-hidden ${
        false
          ? "border-blue-500 ring-2 ring-blue-200 transform scale-[1.02]"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Checkbox indicator */}
      {/* <div
        className={`absolute top-3 right-3 z-20 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? "bg-blue-500 border-blue-500"
            : "bg-white border-gray-300 hover:border-blue-400"
        }`}
      >
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div> */}

      {/* Image */}
      <div className="w-full h-48 bg-gray-100 overflow-hidden relative z-10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.name}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              ID: {item.id}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Overlay highlight */}
    </div>
  );
};

export default ItemCard;
