import { MenuProps } from 'antd';
import { Review } from './reviewModel';
import { PaginationModel } from './reponseModel';

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
	soldQuantityOfProduct?: number;
	totalReviews?: number;
	minPromotionPrice?: number;
	maxPromotionPrice?: number;
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
	//inventory
	inventory: Inventory;
}
interface Inventory {
	createdAt?: string;
	currentQuantity: number;
	historyImportId?: string[];
	originalQuantity: number;
	productCode?: string;
	productSKUBarcode?: string;
	soldQuantity: number;
	updatedAt?: string;
	_id?: string;
}
export interface ProductGroupOption {
	groupName?: string;
	options?: string[];
}

export interface CartProduct extends Product {
	product?: Product;
	productSKU?: ProductSKU;
	isChecked?: boolean;
}
export interface ProductParams {
	offset?: string;
	limit?: string;
	rate?: string;
	sortBy?: string;
	sortType?: string;
	minPrice?: number;
	maxPrice?: number;
}

export interface ReponseGetProductsByCategory {
	products?: Product[];
	pagination?: PaginationModel;
}
export type MenuItem = Required<MenuProps>['items'][number];
