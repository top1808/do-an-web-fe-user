import { MenuItem, Product } from '@/models/productModels';

export const customMoney = (money: number) => {
	return money.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};

export function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}
export const caculatorTotalPrice = (data: Product[]) => {
	return data.reduce((accumulator, value) => {
		return accumulator + value.quantity * value.price;
	}, 0);
};
