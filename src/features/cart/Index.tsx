'use client';

import MTitle from '@/components/MTitle';
import { useEffect } from 'react';
import CustomSteps from './components/StepsPayment';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartEmty from './components/CartEmty';
import { gettingCart } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';

const CartPageComponent = () => {
	const { cart } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingCart());
	}, [dispatch, cart.statusUpdate]);

	return (
		<>
			<Loading visible={cart.loading} />
			<div className='py-8'>
				<MTitle level={2}>My cart</MTitle>
				<div>
					{cart?.items?.length < 1 ? (
						<CartEmty />
					) : (
						<CustomSteps>
							<TableCartProducts data={cart?.items} />
						</CustomSteps>
					)}
				</div>
			</div>
		</>
	);
};

export default CartPageComponent;
