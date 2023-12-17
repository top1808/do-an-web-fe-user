import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import Link from 'next/link';

interface ItemTrendingCategoriesProps {
	image: string;
	title: string;
	category: string;
}
const ItemTredingCategories = (props: ItemTrendingCategoriesProps) => {
	const { image, title, category } = props;
	return (
		<Link
			href={`/product?category=` + category}
			className='w-full block'
		>
			<MRow
				className='relative w-full'
				style={{ background: 'linear-gradient(to bottom, rgba(41,38,33,0) 0%, #292621 100%)' }}
			>
				<MCol span={24}>
					<MImage
						src={image}
						preview={false}
						width={'100%'}
						alt={title}
					/>
				</MCol>
				<MCol
					span={24}
					className='absolute bottom-0 text-center w-full h-16 bg-gray-400 opacity-90 py-4'
				>
					<MText className='text-white text-2xl font-bold'>{title}</MText>
				</MCol>
			</MRow>
		</Link>
	);
};

export default ItemTredingCategories;
