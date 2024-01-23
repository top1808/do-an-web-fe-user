import CartPageComponent from '@/features/cart/Index';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Giỏ hàng',
	description: 'Giỏ hàng của bạn. ',
};
const CartPage = () => {
	// const params = useSearchParams();
	// const isSuccess = params.get('vnp_ResponseCode') === '00' ? true : false;
	// console.log(isSuccess);
	// if(isSuccess){

	// }
	return <CartPageComponent />;
};

export default CartPage;
