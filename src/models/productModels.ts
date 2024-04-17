import { MenuProps } from 'antd';

export interface Product {
	_id?: string;
	name?: string;
	minPrice?: number;
	price?: number;
	maxPrice?: number;
	quantity?: number;
	categoryIds?: string[];
	promotionPrice?: number;
	description?: string;
	status?: boolean;
	totalPrice?: number;
	image?: string;
	images?: string[];
	discount?: number;
	groupOptions?: ProductGroupOption[];
	productSKUList?: ProductSKU[];
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
