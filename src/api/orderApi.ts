import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { OrderParams } from '@/models/paymentModels';

const URL = '/order';

const orderApi = {
	getAll(params: OrderParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
};

export default orderApi;