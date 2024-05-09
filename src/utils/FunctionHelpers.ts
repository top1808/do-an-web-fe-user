import { Address } from '@/models/paymentModels';
import { CartProduct, MenuItem, Product } from '@/models/productModels';
import dayjs from 'dayjs';
import { VNPay } from 'vnpay';

export const vietnamesePhoneNumberRegex = /(0|\+84)(\d{9})\b/;

export const customMoney = (money?: number) => {
	return (money || 0)?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};

export function getItem(label?: React.ReactNode, key?: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
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
export const caculatorTotalPriceForCheckout = (data: CartProduct[]) => {
	return caculatorTotalPrice(data.filter((item) => item.isChecked));
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

export const checkPhoneNumber = (phoneNumber: string) => {
	if (!vietnamesePhoneNumberRegex.test(phoneNumber)) {
		return Promise.reject('Please enter a valid phone number');
	}
	return Promise.resolve();
};

export const getProductPrice = (product: Product) => {
	return (product?.groupOptions?.length || 0) > 0
		? product?.minPrice !== product?.maxPrice
			? `${customMoney(product?.minPrice)} - ${customMoney(product?.maxPrice)}`
			: customMoney(product?.minPrice)
		: customMoney(product?.price);
};
export const getProductPromotionPrice = (product: Product) => {
	if (product.discounts) {
		return product?.minPromotionPrice !== product?.maxPromotionPrice
			? `${customMoney(product?.minPromotionPrice)} - ${customMoney(product?.maxPromotionPrice)}`
			: customMoney(product?.minPromotionPrice);
	}
	return '';
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
export const revertDataAddressFromResponse = (data: any, type: string) => {
	let dataReturn: Address[] = [];
	if (type === 'provinces') {
		dataReturn = data.map((item: any) => {
			const temp: Address = { value: item.ProvinceID, label: item.ProvinceName };
			return temp;
		});
	} else if (type === 'districts') {
		dataReturn = data.map((item: any) => {
			const temp: Address = { value: item.DistrictID, label: item.DistrictName };
			return temp;
		});
	} else {
		dataReturn = data.map((item: any) => {
			const temp: Address = { value: item.WardCode, label: item.WardName };
			return temp;
		});
	}
	return dataReturn.sort((a, b) => (a?.label || '').localeCompare(b?.label || ''));
};
export function getProductsTopSales(products?: Product[], count?: number) {
	if (products && products.length > 0) {
		const temp = [...products];
		temp.sort((a, b) => b.soldQuantityOfProduct! - a.soldQuantityOfProduct!);
		return temp.slice(0, count || 10);
	}
	return products;
}
