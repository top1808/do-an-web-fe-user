import { Address } from './paymentModels';

export interface User {
	_id?: string;
	id?: string;
	password?: string;
	name?: string;
	email?: string;
	phoneNumber?: string;
	address?: string;
	birthday?: string;
	accessToken?: string;
	image?: string;
	userProvince?: Address;
	userDistrict?: Address;
	userWard?: Address;
}
