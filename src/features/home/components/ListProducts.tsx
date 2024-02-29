import React from 'react';
import CardProduct from './CardProduct';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import { Product } from '@/models/productModels';
import MButton from '@/components/MButton';
import Link from 'next/link';

interface ListProductProps {
	listProducts: Product[];
}

const ListProducts: React.FC<ListProductProps> = ({ listProducts }) => {
	return (
		<div>
			<div className='flex justify-between h-14 items-center'>
				<h3 className='h-full text-center leading-10'> Gợi Ý Hôm Nay</h3>
			</div>
			<MRow
				gutter={[
					{ xs: 2, sm: 12, xl: 16 },
					{ xs: 2, sm: 12, xl: 16 },
				]}
			>
				{listProducts.length > 0 &&
					listProducts.map((product, index) => {
						return (
							<MCol
								key={index}
								xs={12}
								md={8}
								xl={4}
							>
								<CardProduct data={product} />
							</MCol>
						);
					})}
			</MRow>
			<div className='w-full flex justify-center mt-6'>
				<Link href='/product?category=all'>
					<MButton>Xem tiếp...</MButton>
				</Link>
			</div>
		</div>
	);
};

export default ListProducts;
