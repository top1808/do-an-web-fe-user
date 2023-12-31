import axiosClient from './axiosClient';
import { Product, CartProduct } from '@/models/productModels';
import { DataPayment } from '@/models/paymentModels';
const URL = '/cart';

const cartApi = {
	getCart() {
		return axiosClient.get(URL);
	},
	addItem(body: Product) {
		return axiosClient.post(URL + '/add-to-cart', body);
	},
	editItem(body: CartProduct) {
		return axiosClient.put(URL + '/' + body._id, body);
	},
	removeItem(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	clearCart() {
		return axiosClient.delete(URL + '/clear');
	},
	pay(body: DataPayment) {
		return axiosClient.post(URL + '/pay', body);
	},
};

export default cartApi;
