import { Product } from './productModels';

export interface DiscountProgram {
	_id?: string;
	name?: string;
	products?: Product[];
	description?: string;
	dateStart?: string | Date;
	dateEnd?: string | Date;
	status?: string;
	discountProgramCode?: string;
}

export interface DiscountProgramParams {
	offset?: string;
	limit?: string;
}
