import { MenuProps } from 'antd';

export interface Product {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	category_id?: string[];
	decription?: string;
	status?: boolean;
	totalPrice?: number;
}
export type MenuItem = Required<MenuProps>['items'][number];
