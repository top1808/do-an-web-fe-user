import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { Category } from '@/models/categoryModels';
import ItemCategories from '../home/components/ItemCategories';
type Props = {
	categories: Category[] | null;
};
const ListCategories = ({ categories }: Props) => {
	return (
		<MRow>
			<MCol span={24}>
				<MTitle level={2}>Danh mục</MTitle>
			</MCol>
			<MCol span={24}>
				<MRow
					gutter={[16, 16]}
					justify={'start'}
				>
					{categories &&
						categories.length > 0 &&
						categories.map((item) => {
							return (
								<MCol
									span={4}
									key={item._id}
									className='shadow-lg'
								>
									<ItemCategories data={item} />
								</MCol>
							);
						})}
				</MRow>
			</MCol>
		</MRow>
	);
};

export default ListCategories;
