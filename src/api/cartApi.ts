import axiosClient from './axiosClient';
import { Product } from '@/models/productModels';
const URL = '/cart';

const cartApi = {
	getCart(body: string) {
		return axiosClient.get(URL + `/${body}`);
	},
	addItem(body: Product) {
		return axiosClient.post(URL + '/add', body);
	},
	removeItem(body: string) {
		return axiosClient.delete(URL + '/remove' + body);
	},
	clearCart() {
		return axiosClient.delete(URL + '/clear');
	},
};

export default cartApi;
