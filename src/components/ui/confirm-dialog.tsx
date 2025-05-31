// confirm-dialog.tsx
import { useConfirm } from 'use-confirm-hook'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

export const ConfirmDialog = () => {
	const { isAsking, message, deny, confirm } = useConfirm()

	return (
		<AlertDialog
			open={isAsking}
			onOpenChange={deny}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xác nhận</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={deny}>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={confirm}>Xác nhận</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
