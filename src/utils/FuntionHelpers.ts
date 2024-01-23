import { MenuItem, Product } from '@/models/productModels';
import axios from 'axios';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { VNPay } from 'vnpay';

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
export const sortObject = (obj: any) => {
	const sorted: any = {};
	const str = [];
	let key;
	for (key in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key));
		}
	}
	str.sort();
	for (key = 0; key < str.length; key++) {
		sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
	}
	return sorted;
};
export const paymentWithVPN = async ({ amount, code, ip, info, returnURL }: { amount: number; code: string; ip: string; info: string; returnURL: string }) => {
	const vnpay = new VNPay({
		api_Host: 'https://sandbox.vnpayment.vn',
		tmnCode: '0HU69EBU',
		secureSecret: 'VEXPZRANPKSPPPFTGBPBNIZHIDOCFNQA',
	});
	const urlString = await vnpay.buildPaymentUrl({
		vnp_Amount: amount, // giá tiền (đơn vị VND)
		vnp_IpAddr: ip, // địa chỉ ip của khách hàng
		vnp_TxnRef: code, // mã giao dịch của bạn
		vnp_OrderInfo: info,
		vnp_ReturnUrl: returnURL,
	});
	window.location.href = urlString;
};
