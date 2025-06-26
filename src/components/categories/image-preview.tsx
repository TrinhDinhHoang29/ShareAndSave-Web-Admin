import { Image } from 'lucide-react'
import { useState } from 'react'

const ImagePreview = ({
	src,
	alt,
	className = ''
}: {
	src: string
	alt: string
	className?: string
}) => {
	const [imageError, setImageError] = useState(false)

	if (imageError || !src) {
		return (
			<div
				className={`bg-muted text-muted-foreground flex items-center justify-center ${className}`}
			>
				<Image size={24} />
			</div>
		)
	}

	return (
		<img
			src={src}
			alt={alt}
			className={`object-cover ${className}`}
			onError={() => setImageError(true)}
		/>
	)
}

export default ImagePreview
