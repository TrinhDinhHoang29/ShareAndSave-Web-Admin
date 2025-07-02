import TransactionDropDown from "@/components/chats/transaction-drop-down/transaction-drop-down";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ITransaction } from "@/types/models/transaction.type";
import { TransactionStatus } from "@/types/status.type";
import { ArrowLeftRight } from "lucide-react";

const PopupUpdateTransaction = ({
  transactions,
  handleSendTransaction,
  authorID,
}: {
  transactions: ITransaction[];
  handleSendTransaction: () => void;
  authorID: number;
}) => {
  const sumTransactionPending = transactions.reduce((pre, curr) => {
    if (curr.status === TransactionStatus.PENDING) return pre + 1;
    return pre;
  }, 0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"} className="relative">
          <ArrowLeftRight />
          {sumTransactionPending > 0 && (
            <div className="flex justify-center absolute top-[-10px] right-[-10px]">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
                <span className="absolute text-white text-xs font-bold">
                  {sumTransactionPending}
                </span>
              </span>
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[80vw] !max-w-[80vw]  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Danh sách giao dịch giao dịch</DialogTitle>
          <DialogDescription>
            Bạn có thể xem và cập nhật giao dịch của mình
          </DialogDescription>
        </DialogHeader>
        {transactions.map((transaction) => (
          <TransactionDropDown
            handleSendTransaction={handleSendTransaction}
            transaction={transaction}
            authorID={authorID}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default PopupUpdateTransaction;
