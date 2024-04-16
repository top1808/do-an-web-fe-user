'use client';
import CartPageComponent from '@/features/cart/Index';
import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Giỏ hàng',
	description: 'Giỏ hàng của bạn. ',
};
const CartPage = () => {
	const params = useSearchParams();
	const isSuccess = params.get('vnp_ResponseCode') === '00' ? true : false;
	if (isSuccess) {
		const data = localStorage.getItem('tempDataPayement');
		console.log(data);
	}

	return <CartPageComponent />;
};

export default CartPage;
