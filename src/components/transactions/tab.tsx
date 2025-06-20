import { DeliveryMethod } from "@/types/status.type";
import { CheckCircle, EyeIcon, ShoppingCart, Truck, Users } from "lucide-react";

export interface TabTransactionProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const TabTransaction = ({ activeTab, setActiveTab }: TabTransactionProps) => {
  return (
    <div>
      <div className="border rounded-md p-2 shadow-sm">
        <div className="flex space-x-2">
          <div
            className={`flex-1 text-center p-2 rounded-md cursor-pointer transition-all duration-200 flex items-center gap-x-2 justify-center
              ${
                activeTab === 1
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--background)] text-black hover:bg-gray-200 hover:shadow"
              }`}
            onClick={() => setActiveTab(1)}
          >
            <Truck /> <div>{DeliveryMethod.DELIVERY}</div>
          </div>
          <div
            className={`flex-1 text-center p-2 rounded-md cursor-pointer transition-all duration-200  flex items-center gap-x-2 justify-center
              ${
                activeTab === 2
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--background)] text-black hover:bg-gray-200 hover:shadow"
              }`}
            onClick={() => setActiveTab(2)}
          >
            <Users /> <div>{DeliveryMethod.MEETINPERSON}</div>
          </div>
        </div>

        {/* Nội dung của tab */}
      </div>
    </div>
  );
};

export default TabTransaction;
