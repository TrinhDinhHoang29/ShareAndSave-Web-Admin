import { Ghost } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
			<Ghost className='text-muted-foreground mb-4 h-20 w-20' />
			<h1 className='mb-2 text-4xl font-bold'>404 - Không tìm thấy trang</h1>
			<p className='text-muted-foreground mb-6'>
				Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xoá.
			</p>
			<Button asChild>
				<Link to='/dashboard'>Quay về trang chủ</Link>
			</Button>
		</div>
	)
}
