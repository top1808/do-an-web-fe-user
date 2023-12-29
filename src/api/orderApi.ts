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
	cancelOrder({ id, reason }: { id: string; reason: string }) {
		return axiosClient.put(URL + '/change-status/' + id, { status: 'canceled', reason });
	},
	confirmReceivedOrder(id: string) {
		return axiosClient.put(URL + '/change-status/' + id, { status: 'received' });
	},
};

export default orderApi;
