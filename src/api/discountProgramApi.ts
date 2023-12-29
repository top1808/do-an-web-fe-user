import axiosClient from './axiosClient';

const URL = '/discount-program';

const discountProgramApi = {
	getAll() {
		return axiosClient.get(URL + '/get-all');
	},
};

export default discountProgramApi;
