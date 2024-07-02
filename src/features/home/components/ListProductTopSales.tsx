'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import Link from 'next/link';
import CardProduct from './CardProduct';
import { useAppSelector } from '@/redux/hooks';
import { getProductState } from '@/redux/reducers/productReducer';
import { getProductsTopSales } from '@/utils/FunctionHelpers';
const ListProductTopSales = () => {
	const product = useAppSelector(getProductState);

	return (
		<MSkeleton loading={product.loading}>
			<div className='bg-white px-2'>
				<div className='flex justify-between h-14 items-center'>
					<h3 className='h-full text-center leading-10 py-4 font-semibold text-gray-600'>TOP PRODUCTS</h3>
				</div>
				<MRow
					gutter={[
						{ xs: 2, sm: 12, xl: 16 },
						{ xs: 2, sm: 12, xl: 16 },
					]}
				>
					{getProductsTopSales(product.data)?.map((product, index) => {
						return (
							<MCol
								key={index}
								xs={12}
								md={8}
								xl={4}
							>
								<CardProduct
									data={product}
									isTop={true}
								/>
							</MCol>
						);
					})}
				</MRow>
			</div>
		</MSkeleton>
	);
};

export default ListProductTopSales;
