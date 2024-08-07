import { Address, DataPayment } from '@/models/paymentModels';
import { CartProduct, DiscountProduct, MenuItem, Product } from '@/models/productModels';
import { Review } from '@/models/reviewModel';
import axios from 'axios';
import dayjs from 'dayjs';
import { VNPay } from 'vnpay';

export const vietnamesePhoneNumberRegex = /(0|\+84)(\d{9})\b/;
export const getSlugFromNameProduct = ({ name, id }: { name?: string; id?: string }) => {
	const cleaned = name?.replace(/[./-]/g, ' ').replace(/\s+/g, ' ').trim();
	return cleaned?.split(' ').join('-').toLowerCase() + '-' + id;
};
export const customMoney = (money?: number) => {
	return (money || 0)?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};
export const compareString = (a?: string, b?: string) => {
	return a?.toLowerCase() === b?.toLowerCase() ? true : false;
};
export function getItem(label?: React.ReactNode, key?: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group', disabled?: boolean): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
		disabled,
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
export const paymentWithVPN = async (dataPost: DataPayment) => {
	try {
		const date = new Date();
		const code =
			date.getFullYear() +
			('0' + (date.getMonth() + 1)).slice(-2) +
			('0' + date.getDate()).slice(-2) +
			('0' + date.getHours()).slice(-2) +
			('0' + date.getMinutes()).slice(-2) +
			('0' + date.getSeconds()).slice(-2);
		localStorage.setItem('tempDataPayement', JSON.stringify({ ...dataPost }));
		const vnpay = new VNPay({
			api_Host: 'https://sandbox.vnpayment.vn',
			tmnCode: '0HU69EBU',
			secureSecret: 'VEXPZRANPKSPPPFTGBPBNIZHIDOCFNQA',
		});
		const ip = await axios.get('https://api.ipify.org/');
		const urlString = await vnpay.buildPaymentUrl({
			vnp_Amount: dataPost.totalPrice || 0, // giá tiền (đơn vị VND)
			vnp_IpAddr: ip.data, // địa chỉ ip của khách hàng
			vnp_TxnRef: code, // mã giao dịch của bạn
			vnp_OrderInfo: `Thanh toán cho order ${code}`,
			vnp_ReturnUrl: 'http://localhost:3000/checkout',
		});
		window.location.href = urlString;
	} catch (error) {
		localStorage.removeItem('tempDataPayement');
	}
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
export const filterReviewsByRating = (reviews: Review[], rating: number) => {
	if (rating === -1) return reviews;
	const temp = [...reviews];
	const filteredReviews = temp.filter((review) => review.rate! === rating);
	return filteredReviews;
};
export const getProductsSKUSalesByOneOption = (product?: Product) => {
	if (product?.groupOptions?.length === 1 && product.discounts && product.discounts?.length > 0) {
		const result = product.discounts.map((item) => {
			return item.options?.[0].option ?? '';
		});
		return result;
	}
	return undefined;
};
export const getProductsSKUSales = (productDiscount: DiscountProduct[]) => {
	const result = productDiscount.map((item) => {
		return {
			value: `${item.options?.[0].option},${item.options?.[1].option}`,
			lable: `${item.options?.[0].groupName} : ${item.options?.[0].option}, ${item.options?.[1].groupName} : ${item.options?.[1].option} giảm ${item.value}${item.type === 'percent' ? '%' : 'đ'}`,
		};
	});
	return result;
};
