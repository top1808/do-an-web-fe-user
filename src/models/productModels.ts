import { MenuProps } from 'antd';
import { Review } from './reviewModel';

export interface Product {
	productCode?: string;
	_id?: string;
	name?: string;
	minPrice?: number;
	price?: number;
	maxPrice?: number;
	quantity?: number;
	categoryIds?: string[];
	promotionPrice?: number;
	description?: string;
	status?: string;
	totalPrice?: number;
	image?: string;
	images?: string[];
	discounts?: DiscountProduct[];
	groupOptions?: ProductGroupOption[];
	productSKUList?: ProductSKU[];
	value?: number;
	productSKUBarcode?: string;
	productSKU?: ProductSKU;
	discount?: DiscountProduct;
	type?: string;
	rate?: number;
	reviews?: Review[];
}
export interface DiscountProduct {
	createdAt?: string;
	options?: ProductSKUOption[];
	price?: number;
	promotionPrice?: number;
	type?: string;
	value?: number;
	_id?: string;
	productSKUBarcode?: string;
	updatedAt?: string;
	status?: boolean;
}
export interface ProductSKUOption {
	groupName?: string;
	option?: string;
	_id: string;
}
export interface ProductSKU extends Product {
	barcode?: string;
	image?: string;
	options: ProductSKUOption[];
	price?: number;
	productId?: string;
	// test
	productName?: string;
	isReviewed?: boolean;
	orderCode?: string;
}

export interface ProductGroupOption {
	groupName?: string;
	options?: string[];
}

export interface CartProduct extends Product {
	product?: Product;
	productSKU?: ProductSKU;
}

export type MenuItem = Required<MenuProps>['items'][number];
