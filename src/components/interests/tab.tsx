import { CheckCircle, EyeIcon } from "lucide-react";

export interface TabInterestsProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const TabInterests = ({ activeTab, setActiveTab }: TabInterestsProps) => {
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
            <EyeIcon /> <div>Đang quan tâm</div>
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
            <CheckCircle /> <div> Được quan tâm</div>
          </div>
        </div>

        {/* Nội dung của tab */}
      </div>
    </div>
  );
};

export default TabInterests;
