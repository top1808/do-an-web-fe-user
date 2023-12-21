import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import ItemTredingCategories from '../home/components/ItemTredingCategories';

const TrendingCategories = () => {
	return (
		<MRow>
			<MCol span={24}>
				<MTitle level={2}>Trending categories</MTitle>
			</MCol>
			<MCol span={24}>
				<MRow
					gutter={[16, 16]}
					justify={'space-between'}
				>
					<MCol span={8}>
						<ItemTredingCategories
							category='6569fcf48b9e614c46513c82'
							image='https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items1.jpg.webp'
							title="Men's fashion"
						/>
					</MCol>
					<MCol span={8}>
						<ItemTredingCategories
							category='6569fe3c8b9e614c46513cbf'
							image='https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items2.jpg.webp'
							title="Women's fashion"
						/>
					</MCol>
					<MCol span={8}>
						<ItemTredingCategories
							category='656a00548b9e614c46513d0c'
							image='https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items3.jpg.webp'
							title="Baby's fashion"
						/>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};

export default TrendingCategories;
