import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { Category } from '@/models/categoryModels';
import ItemCategories from '../home/components/ItemCategories';
import CustomSlider from '@/components/CustomSlider';
type Props = {
	categories: Category[] | null;
};
const ListCategories = ({ categories }: Props) => {
	return (
		<MRow className='xs:mb-6 md:mb-0'>
			<MCol span={24}>
				<MTitle level={3}>Category</MTitle>
			</MCol>
			<MCol span={24}>
				{categories && categories.length > 0 && (
					<CustomSlider length={categories?.length}>
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
