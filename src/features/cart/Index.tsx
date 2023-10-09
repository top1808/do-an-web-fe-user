'use client';

import MTitle from '@/components/MTitle';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomSteps from './components/StepsPayment';
import TableCartProducts from './components/TableCartProducts';
import MPagination from '@/components/MPagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartEmty from './components/CartEmty';
import { gettingCart } from '@/redux/reducers/cartReducer';
const CartPageComponent = () => {
	const { cart } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const [pageCurrent, setPageCurrent] = useState(1);
	useEffect(() => {
		dispatch(gettingCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='py-8'>
			<div>
				<Link
					href={'/home'}
					className='text-gray-400'
				>
					Home
				</Link>
				<span className='pl-1'>
					<FontAwesomeIcon icon={faGreaterThan} />
					<FontAwesomeIcon icon={faGreaterThan} />
				</span>
				<span className='pl-1 text-red-600'>My cart</span>
			</div>
			<MTitle level={2}>My cart</MTitle>
			<div>
				{cart.items.length < 1 ? (
					<CartEmty />
				) : (
					<>
						<CustomSteps>
							<TableCartProducts data={cart.items} />
							<div className='text-center mt-2'>
								<MPagination
									defaultCurrent={1}
									current={pageCurrent}
									total={cart.items.length ? cart.items.length : 0}
									pageSize={10}
									onChange={(page) => {
										window.scrollTo(0, 0);
										setPageCurrent(page);
									}}
								/>
							</div>
						</CustomSteps>
					</>
				)}
			</div>
		</div>
	);
};

export default CartPageComponent;
