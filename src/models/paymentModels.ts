import { ApplyVoucherInfor } from './voucherModel';

export interface DataPayment {
	customerName?: string;
	customerPhone?: string;
	customerEmail?: string;
	deliveryAddress?: string;
	note?: string;
	paymentMethod?: string;
	products?: OrderProduct[];
	totalProductPrice?: number;
	totalPaid?: number;
	deliveryFee?: number;
	totalPrice?: number;
	deliveryDate?: Date | string;
	createdAt?: Date | string;
	voucher?: ApplyVoucherInfor | null;
	vnpayTransactionNo?: string | null;
	deliveryMethod?: string;
	customerProvince?: number;
	customerDistrict?: number;
	customerWard?: number;
}

export interface Order {
	_id?: string;
	orderCode?: string;
	customerCode?: string;
	customerName?: string;
	customerAddress?: string;
	customerPhone?: string;
	products?: OrderProduct[] | null;
	note?: string;
	status?: string;
	totalProductPrice?: number;
	totalPrice?: number;
	totalPaid?: number;
	paymentMethod?: string;
	deliveryAddress?: string;
	deliveryDate?: Date | string;
	deliveryFee?: number;
	voucherDiscount?: number;
	voucherCode?: string;
	createdAt?: Date | string;
	vnpayTransactionNo?: number;
}

export interface OrderProduct {
	productCode?: string;
	productName?: string;
	productQuantity?: number;
	price?: number;
	quantity?: number;
	totalPrice?: number;
	image?: string;
}

export interface ReponsePaySuccess {
	order: Order;
	message: string;
}

export interface OrderParams {
	limit?: number;
	offset?: number;
	status?: 'delivering' | 'delivered' | 'canceled' | 'all';
}
export interface Address {
	value: number;
	label: string;
}
export interface ParamsGetFeeDelivery {
	service_id: string | number;
	insurance_value?: number;
	coupon?: number;
	cod_failed_amount?: number;
	from_district_id: number;
	from_ward_code?: string | number;
	to_ward_code: string | number;
	to_district_id: string | number;
	weight?: number;
	length?: number;
	width?: number;
	height?: number;
	cod_value?: number;
}
export interface ParamsGetService {
	shop_id: string;
	from_district: string;
	to_district: string;
}
export interface ResponeServiceFromGHN {
	service_id: number;
	short_name: string;
	service_type_id: 5;
	config_fee_id?: string;
	extra_cost_id?: string;
	standard_config_fee_id?: string;
	standard_extra_cost_id?: string;
}
