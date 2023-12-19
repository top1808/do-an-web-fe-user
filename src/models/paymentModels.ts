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
	createdAt?: Date | string;
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
