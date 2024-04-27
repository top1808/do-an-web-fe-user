import { Product } from './productModels';
import { User } from './userModel';

export interface ReviewBody {
	rate: number;
	content: string;
	product?: string;
	images?: string;
	isAnonymous?: boolean;
	customer?: string;
	productSKU?: string;
	orderCode?: string;
	productOrderId?: string;
}
export interface Review {
	content?: string;
	rate?: number;
	productOrderId?: string;
	customer?: User;
	customerId?: string;
	product?: Product;
	productSKU?: string;
	orderCode?: string;
	images?: string[];
	createdAt?: string;
	updatedAt?: string;
	isAnonymous?: boolean;
	_id?: string;
}
