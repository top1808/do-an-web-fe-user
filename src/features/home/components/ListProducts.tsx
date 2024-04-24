import React from 'react';
import CardProduct from './CardProduct';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import { Product } from '@/models/productModels';
import MButton from '@/components/MButton';
import Link from 'next/link';

interface ListProductProps {
	listProducts: Product[];
	title: string;
	buttonName: string;
}

const ListProducts: React.FC<ListProductProps> = ({ listProducts, title, buttonName }) => {
	return (
		<div className='bg-white p-2'>
			<div className='flex justify-center h-14 items-center'>
				<h3 className='h-full text-center leading-10 py-4 font-semibold text-red-400 '>{title}</h3>
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
					<MButton>{buttonName}</MButton>
				</Link>
			</div>
		</div>
	);
};

export default ListProducts;
