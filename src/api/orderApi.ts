import { objectToQueryString } from '@/utils/FunctionHelpers';
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
	cancelOrder({ id, reason, receivedDate }: { id: string; reason: string; receivedDate: string }) {
		return axiosClient.put(URL + '/change-status/' + id, { status: 'canceled', reason, receivedDate });
	},
	confirmReceivedOrder({ id, receivedDate }: { id: string; receivedDate: string }) {
		return axiosClient.put(URL + '/change-status/' + id, { status: 'received', receivedDate });
	},
};

export default orderApi;
