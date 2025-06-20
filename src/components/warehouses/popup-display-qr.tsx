import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode, Printer } from "lucide-react";
import QRCode from "react-qr-code";
import { useRef } from "react";

const PopDisplayQR = ({ value }: { value: string }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open("", "_blank", "width=600,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>In mã QR</title>
          <style>
            body { margin: 0; padding: 40px; display: flex; justify-content: center; align-items: center; height: 100vh; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Mã code món đồ</DialogTitle>
          <Button variant="ghost" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1" /> In
          </Button>
        </DialogHeader>
        <div
          ref={printRef}
          style={{
            height: "auto",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopDisplayQR;
