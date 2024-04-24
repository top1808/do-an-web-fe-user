import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { Category } from '@/models/categoryModels';
import ItemCategories from '../home/components/ItemCategories';
import CustomSlider from '@/components/CustomSlider';
type Props = {
	categories: Category[] | null;
	title: string;
};
const ListCategories = ({ categories, title }: Props) => {
	return (
		<MRow className='xs:mb-6 md:mb-0 bg-white px-2 '>
			<MCol
				span={24}
				className='py-4'
			>
				<h3 className='text-gray-400 text-2xl font-semibold'>{title}</h3>
			</MCol>
			<MCol
				span={24}
				className='px-1'
			>
				{categories && categories.length > 0 && (
					<CustomSlider
						length={categories?.length}
						autoPlay={false}
					>
						{categories.map((item) => {
							return (
								<ItemCategories
									key={item._id}
									data={item}
								/>
							);
						})}
					</CustomSlider>
				)}
			</MCol>
		</MRow>
	);
};

export default ListCategories;
