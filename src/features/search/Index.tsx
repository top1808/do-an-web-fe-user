'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import CardProduct from '../home/components/CardProduct';
import MText from '@/components/MText';
import SearchFilter from '@/components/SearchFilter';
import { Product } from '@/models/productModels';
import SideBarUser from '@/layout/SidebarUser';

interface SearchPageComponentProps {
	searchResults: Product[];
	keySearch?: string;
}

const SearchPageComponent = ({ searchResults, keySearch }: SearchPageComponentProps) => {
	return (
		<>
			<MRow
				className='mt-4'
				gutter={[16, 16]}
			>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={8}
					xl={6}
				>
					<MRow gutter={[16, 16]}>
						<MCol span={24}>
							<SideBarUser />
						</MCol>
						<MCol span={24}>
							<SearchFilter />
						</MCol>
					</MRow>
				</MCol>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={16}
					xl={18}
				>
					<div className='py-4 px-2'>
						<MText className='text-xl font-bold'>Từ khóa tìm kiếm: {keySearch}.</MText> &nbsp;
						<MText className='text-xl font-bold'>Tìm thấy {searchResults.length} sản phẩm</MText>
					</div>
					<MRow gutter={[12, 12]}>
						{searchResults.length > 0 &&
							searchResults.map((product, index) => {
								return (
									<MCol
										key={index}
										xs={12}
										md={8}
										lg={6}
									>
										<CardProduct data={product} />
									</MCol>
								);
							})}
					</MRow>
				</MCol>
			</MRow>
		</>
	);
};

export default SearchPageComponent;
