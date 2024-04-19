'use client';

import MTitle from '@/components/MTitle';
import { useEffect } from 'react';
import CustomSteps from './components/StepsPayment';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartEmty from './components/CartEmty';
import { gettingCart, setIPCustomer } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';
import axios from 'axios';

const CartPageComponent = () => {
	const { cart } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingCart());
		axios.get('https://api.ipify.org/').then((res) => dispatch(setIPCustomer(res.data)));
	}, [dispatch]);

	return (
		<>
			{(cart?.loading || cart.statusUpdate === 'loading') && <Loading />}

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
