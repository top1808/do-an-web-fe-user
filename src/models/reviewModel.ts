export interface ReviewBody {
	rate: number;
	content: string;
	product?: string;
	images?: string;
	isAnonymous?: boolean;
	customer?: string;
	productSKU?: string;
	orderCode?: string;
}
