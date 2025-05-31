import { Loader2 } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
	message?: string
	fullScreen?: boolean
	className?: string
	textColor?: string
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
	message,
	fullScreen = false,
	className,
	textColor = 'text-primary'
}) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center',
				fullScreen && 'bg-background/80 fixed inset-0 z-50 backdrop-blur-sm',
				!fullScreen && 'min-h-[60vh]',
				className
			)}
		>
			<Loader2 className={`${textColor} h-8 w-8 animate-spin`} />
			{message && <p className='text-muted-foreground mt-4'>{message}</p>}
		</div>
	)
}

export default LoadingSpinner
