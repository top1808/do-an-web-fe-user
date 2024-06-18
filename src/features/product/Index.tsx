'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import SideBarUser from '@/layout/SidebarUser';
import { Product } from '@/models/productModels';
import React from 'react';
import CardProduct from '../home/components/CardProduct';
import MTitle from '@/components/MTitle';
import { PaginationModel } from '@/models/reponseModel';
import MPagination from '@/components/MPagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { objectToQueryString } from '@/utils/FunctionHelpers';
import SearchFilter from '@/components/SearchFilter';

interface ProductsComponentProps {
	products?: Product[];
	pagination?: PaginationModel;
}

const ProductsComponent = (props: ProductsComponentProps) => {
	const { products, pagination } = props;
	const params = useSearchParams();
	const category = params.get('category');
	const path = usePathname();
	const router = useRouter();
	const onChangePagination = (page: number) => {
		const query = objectToQueryString({ category, offset: (page - 1) * 12, limit: 12 });
		router.push(path + query);
	};

	return (
		<MRow
			gutter={12}
			className='py-8'
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
				<MRow gutter={[0, 0]}>
					<MCol span={24}></MCol>
					<MCol span={24}>
						<MRow gutter={[12, 12]}>
							{products &&
								products?.length > 0 &&
								products.map((product, index) => {
									return (
										<MCol
											key={index}
											xs={12}
											sm={12}
											md={12}
											lg={8}
											xl={6}
										>
											<CardProduct data={product} />
										</MCol>
									);
								})}

							{(!products || products?.length <= 0) && (
								<MTitle
									className='pl-2'
									level={3}
								>
									Không tìm thấy sản phẩm phù hợp !
								</MTitle>
							)}
						</MRow>
						<div className='w-full text-center mt-4'>
							{products && products.length > 0 && (
								<MPagination
									current={pagination?.page}
									total={pagination?.total}
									onChange={onChangePagination}
									pageSize={12}
								/>
							)}
						</div>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};

export default ProductsComponent;
