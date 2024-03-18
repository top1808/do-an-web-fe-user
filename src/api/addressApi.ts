import { objectToQueryString } from '@/utils/FunctionHelpers';
import axios from 'axios';

// eslint-disable-next-line prettier/prettier
const headers = { token: process.env.TOKEN_GIAOHANGNHANH_API, shop_id: '4925558' };
const baseURL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const AddressApi = {
	getProvinces() {
		const URL = baseURL + '/province';
		return axios.get(URL, { headers });
	},
	getWards(body: any) {
		const query = objectToQueryString(body);
		const URL = baseURL + '/ward' + query;
		return axios.get(URL, { headers });
	},
	getDistricts(body: any) {
		const query = objectToQueryString(body);
		const URL = baseURL + '/district' + query;
		return axios.get(URL, { headers });
	},
	getFeeDelivery(body: any) {
		const query = objectToQueryString(body);
		const URL = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee' + query;
		return axios.get(URL, { headers });
	},
	getService(body: any) {
		const query = objectToQueryString(body);
		const URL = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services' + query;
		return axios.get(URL, { headers });
	},
};
export default AddressApi;
