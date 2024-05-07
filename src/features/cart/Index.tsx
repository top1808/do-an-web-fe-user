'use client';
import MTitle from '@/components/MTitle';
import { useEffect } from 'react';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getCartState, gettingCart } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';
import CartEmpty from './components/CartEmty';

const CartPageComponent = () => {
	const cart = useAppSelector(getCartState);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingCart());
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
