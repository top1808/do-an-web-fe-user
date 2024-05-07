'use client';
import { useEffect } from 'react';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCartState, gettingCart } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';
import CartEmpty from './components/CartEmty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

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
				<h2 className='text-3xl text-red-400 text-center py-4'>
					<FontAwesomeIcon icon={faBasketShopping} /> &nbsp; Giỏ hàng
				</h2>
				<div>{cart?.items?.length < 1 ? <CartEmpty /> : <TableCartProducts data={cart?.items} />}</div>
			</div>
		</>
	);
};

export default CartPageComponent;
