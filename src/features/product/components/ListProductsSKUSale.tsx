import { DiscountProduct } from '@/models/productModels';
import { getProductsSKUSales } from '@/utils/FunctionHelpers';
import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
type PropsListProductSale = {
	data: DiscountProduct[];
};
const ListProductsSKUSale = ({ data }: PropsListProductSale) => {
	const items: MenuProps['items'] = [...getProductsSKUSales(data).map((item) => ({ key: item, label: item }))];

	return (
		<Dropdown menu={{ items }}>
			<Space className='p-1 text-blue-600'>Danh sách loại sản phẩm giảm giá</Space>
		</Dropdown>
	);
};

export default ListProductsSKUSale;
