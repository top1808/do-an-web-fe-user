import CartPageComponent from '@/features/cart/Index';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Giỏ hàng',
	description: 'Giỏ hàng của bạn. ',
};
const CartPage = () => {
	return <CartPageComponent />;
};

export default CartPage;
