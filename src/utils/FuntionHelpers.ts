import { MenuItem, Product } from '@/models/productModels';
import dayjs from 'dayjs';

export const customMoney = (money?: number) => {
	return (money || 0)?.toLocaleString('vi-VN', {
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
		return accumulator + (value?.totalPrice || 0);
	}, 0);
};

export const handleFormatterInputNumber = (value: number | undefined) => {
	if (value !== undefined) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}
	return '1';
};
export const handleParserInputNumber = (value: string | undefined) => {
	if (value !== undefined) {
		return Number(value.replace(/\./g, ''));
	}
	return 1;
};

export const objectToQueryString = <T>(object: T): string => {
	return '?' + new URLSearchParams(object || '').toString();
};

export const formatDate = (date?: Date | string, format?: string) => {
	return dayjs(date || new Date()).format(format || 'DD/MM/YYYY');
};

export const formatPhonenumber = (phoneNumber: string) => {
	return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};
