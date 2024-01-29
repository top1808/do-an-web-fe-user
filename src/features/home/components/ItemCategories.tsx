import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { Category } from '@/models/categoryModels';
import Link from 'next/link';
type PropsItemCategory = {
	data: Category;
};
const ItemCategories = ({ data }: PropsItemCategory) => {
	const { _id, image, name } = data;
	return (
		<Link
			href={`/product?category=` + _id}
			className='w-full block	shadow-md p-2'
		>
			<MRow
				className='w-full'
				style={{ background: 'linear-gradient(to bottom, rgba(41,38,33,0) 0%, #FFFFFF 100%)' }}
				justify={'center'}
				gutter={[16, 16]}
			>
				<MCol
					span={24}
					className='flex justify-center'
				>
					<MImage
						src={image}
						preview={false}
						width={'25%'}
						alt={name}
						className='items-center'
					/>
				</MCol>
				<MCol
					span={24}
					className='text-center w-full h-16 opacity-90 py-4'
				>
					<MText className='text-black text-xl font-bold'>{name}</MText>
				</MCol>
			</MRow>
		</Link>
	);
};
export default ItemCategories;
