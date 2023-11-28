import { Product } from './productModels';

export interface Bill {
	_id?: string;
	dateOrder?: string;
	paymentMethod?: string;
	items: Product[];
}
