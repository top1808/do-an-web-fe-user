import { DiscountProduct } from '@/models/productModels';
import { useAppDispatch } from '@/redux/hooks';
import { setDefaultOption } from '@/redux/reducers/productReducer';
import { getProductsSKUSales } from '@/utils/FunctionHelpers';
import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
type PropsListProductSale = {
	data: DiscountProduct[];
};
const ListProductsSKUSale = ({ data }: PropsListProductSale) => {
	const dispatch = useAppDispatch();
	const items: MenuProps['items'] = [...getProductsSKUSales(data).map((item) => ({ key: item.value, label: item.lable }))];
	const onClick: MenuProps['onClick'] = ({ key }) => {
		const options = key.split(',');
		dispatch(setDefaultOption([...options]));
	};
	return (
		<Dropdown menu={{ items, onClick }}>
			<Space className='p-1 text-blue-600'>Danh sách loại sản phẩm giảm giá</Space>
		</Dropdown>
	);
};

export default ListProductsSKUSale;
