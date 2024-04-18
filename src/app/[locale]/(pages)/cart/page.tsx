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
		// tien hanh tao hoa don voi data
		console.log(data);
	} else {
		// thanh toan that bai
		localStorage.removeItem('tempDataPayement');
	}
	return <CartPageComponent />;
};

export default CartPage;
