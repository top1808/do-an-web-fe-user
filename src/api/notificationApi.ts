import { objectToQueryString } from '@/utils/FunctionHelpers';
import axiosClient from './axiosClient';
import { NotificationParams } from '@/models/notificationModel';

const URL = '/notification';

const notificationApi = {
	getData(params: NotificationParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	read(id: string) {
		return axiosClient.put(URL + `/read/${id}`);
	},
};

export default notificationApi;
