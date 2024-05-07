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
			className='w-full block'
		>
			<MRow
				className='w-full border-gray-400 border-[1px] border-solid p-2 hover:opacity-80'
				justify={'center'}
				gutter={[16, 16]}
			>
				<MCol
					span={24}
					className='flex justify-center '
				>
					<MImage
						src={image}
						preview={false}
						width={'60%'}
						alt={name}
						className='rounded-full p-1 bg-slate-400'
					/>
				</MCol>
				<MCol
					span={24}
					className='text-center w-full  xs:h-12 md:h-16 opacity-90 md:py-2 xl:py-4'
				>
					<MText className='text-black xs:text-xs md:text-sm xl:text-md font-bold'>{name}</MText>
				</MCol>
			</MRow>
		</Link>
	);
};
export default ItemCategories;
