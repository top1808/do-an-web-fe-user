import ListOrderProducts from './components/ListOrderProducts';
import Purchased from './components/Purchased';
import { Tabs, TabsProps } from 'antd';

const PurchasedComponent = () => {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Tất cả hóa đơn',
			children: <Purchased />,
		},
		{
			key: '2',
			label: 'Tất cả sản phẩm đã mua',
			children: <ListOrderProducts />,
		},
		{
			key: '3',
			label: 'Đã đánh giá',
			children: <div>áđâs</div>,
		},
	];

	return (
		<Tabs
			defaultActiveKey='1'
			items={items}
		/>
	);
};

export default PurchasedComponent;
