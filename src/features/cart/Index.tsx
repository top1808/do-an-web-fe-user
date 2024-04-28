'use client';
import MTitle from '@/components/MTitle';
import { useEffect } from 'react';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getCartState, gettingCart, setIPCustomer } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';
import axios from 'axios';
import CartEmpty from './components/CartEmty';

const CartPageComponent = () => {
	const cart = useAppSelector(getCartState);
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
				<div>{cart?.items?.length < 1 ? <CartEmpty /> : <TableCartProducts data={cart?.items} />}</div>
			</div>
		</>
	);
};

export default CartPageComponent;
