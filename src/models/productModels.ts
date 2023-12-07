import { MenuProps } from 'antd';

export interface Product {
	_id?: string;
	name?: string;
	price?: number;
	quantity?: number;
	categoryIds?: string[];
	promotionPrice?: number;
	description?: string;
	status?: boolean;
	totalPrice?: number;
	image?: string;
	discount?: number;
}

export interface CartProduct extends Product {
	product?: Product;
}

export type MenuItem = Required<MenuProps>['items'][number];
