import BillComponent from '@/features/cart/components/Bill';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Chi tiết đơn hàng',
	description: 'Chi tiết đơn hàng.',
};
const Bill = () => {
	return (
		<div>
			<BillComponent />
		</div>
	);
};

export default Bill;
