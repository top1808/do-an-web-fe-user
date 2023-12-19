import axiosClient from './axiosClient';
import { ApplyVoucherModel } from '@/models/voucherModel';

const URL = '/voucher';

const voucherApi = {
	getVouchers() {
		return axiosClient.get(URL + '/get-list');
	},
	applyVoucher(body: ApplyVoucherModel) {
		return axiosClient.post(URL + '/apply-voucher', body);
	},
};

export default voucherApi;
