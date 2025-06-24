import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Package2 } from "lucide-react";

const PopupShowDescription = ({ description }: { description: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <div className="flex gap-x-2 items-center">
            <Eye className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-x-2 items-center">
              <Package2 className="w-4 h-4" />
              <span>Mô tả</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        {description}
      </DialogContent>
    </Dialog>
  );
};

export default PopupShowDescription;
