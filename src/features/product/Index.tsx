'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import SideBarUser from '@/layout/SidebarUser';
import { Product } from '@/models/productModels';
import React from 'react';
import CardProduct from '../home/components/CardProduct';
import SearchBar from '../components/SearchBar';

interface ProductsComponentProps {
	products: Product[];
}

const ProductsComponent = (props: ProductsComponentProps) => {
	const { products } = props;
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
				<SideBarUser />
			</MCol>
			<MCol
				xs={24}
				sm={24}
				md={24}
				lg={16}
				xl={18}
			>
				<MRow gutter={[0, 10]}>
					<MCol span={24}>
						<SearchBar />
					</MCol>
					<MCol span={24}>
						<MRow gutter={[12, 12]}>
							{products.length > 0 &&
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
						</MRow>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};

export default ProductsComponent;
