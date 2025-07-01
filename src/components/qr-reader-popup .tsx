import { Button } from "@/components/ui/button";
import { useItemWarehouse } from "@/hooks/react-query-hooks/use-item-warehouses";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { WarehouseItemStatus } from "@/types/status.type";
import { AlertCircle, Camera, ScanQrCodeIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";

export interface QRReaderPopupProps {
  setListsNewItem: React.Dispatch<React.SetStateAction<IItemWarehouse[]>>;
}
const QRReaderPopup = ({ setListsNewItem }: QRReaderPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [code, setCode] = useState("");
  const itemQuery = useItemWarehouse(code);
  useEffect(() => {
    if (code && itemQuery.data) {
      const item = itemQuery.data;
      if (
        itemQuery.data.itemWarehouse.status === WarehouseItemStatus.OUTSTOCK
      ) {
        setError(`Món đồ ${item.itemWarehouse.itemName} đã hết hàng`);
        setIsOpen(true);
        setIsScanning(false);
        return;
      }
      setListsNewItem((prev) => {
        const exists = prev.some((i) => i.code === item.itemWarehouse.code);
        return exists ? prev : [...prev, item.itemWarehouse];
      });
      setCode(""); // reset sau khi xong
    }

    if (itemQuery.isError) {
      setError(`Không tìm thấy món đồ với mã: ${code}`);
      setIsOpen(true); // mở lại popup
      setIsScanning(false);
    }
  }, [code, itemQuery.data, itemQuery.isError, setListsNewItem]);
  // Xử lý khi quét thành công
  const handleScan = (data: string | null) => {
    if (data) {
      setCode(data.trim());
      setIsOpen(false);
      setIsScanning(false);
    }
  };
  // Xử lý lỗi khi quét
  const handleError = (err: string) => {
    console.error("QR Scanner Error:", err);
    setError("Lỗi khi quét mã QR. Vui lòng thử lại.");
    setIsScanning(false);
  };

  // Mở popup
  const openPopup = () => {
    setIsOpen(true);
    setError("");
    setIsScanning(true);
  };

  // Đóng popup
  const closePopup = () => {
    setIsOpen(false);
    setError("");
    setIsScanning(false);
  };

  useEffect(() => {
    return () => setIsScanning(false);
  }, []);

  return (
    <div>
      {/* Nút bấm đơn giản */}
      <Button onClick={openPopup} variant={"outline"}>
        <ScanQrCodeIcon className="w-5 h-5" />
        Quét mã QR
      </Button>

      {/* Popup quét QR */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Quét mã QR</h2>
              </div>
              <button
                onClick={closePopup}
                className="p-1 hover:bg-white/20 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {!error && (
                <div className="space-y-4">
                  {/* Khung quét QR */}
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                    {isScanning ? (
                      <div className="relative w-full h-full">
                        <QrReader
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          style={{ width: "100%" }}
                          facingMode="environment"
                        />
                        {/* Góc bo tròn với hiệu ứng neon */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Thanh quét động */}
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-1 bg-red-400/50 animate-scanLine" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Camera className="w-16 h-16 text-gray-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  <p className="text-center text-gray-600 text-sm">
                    Đưa mã QR vào khung để quét
                  </p>
                </div>
              )}

              {/* Kết quả quét thành công */}

              {/* Lỗi quét */}
              {error && (
                <div className="space-y-4 text-center animate-fadeIn">
                  <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-600">
                    Lỗi quét mã
                  </h3>
                  <p className="text-sm text-gray-600">{error}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setError("");
                        setIsScanning(true);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={closePopup}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-all"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scanLine {
          animation: scanLine 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QRReaderPopup;
