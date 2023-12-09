import axiosClient from './axiosClient';
import { FormRegister, FormLogin, FormChangePassword, FormChangeInfor } from '../models/authModel';

const URL = '/auth';

const authApi = {
	register(body: FormRegister) {
		return axiosClient.post(URL + '/register', body);
	},
	login(body: FormLogin) {
		return axiosClient.post(URL + '/login', body);
	},
	checkExist(id: string) {
		return axiosClient.get('/customer/' + id);
	},
	getById(id: string) {
		return axiosClient.get('/customer/' + id);
	},
	changePassword(body: FormChangePassword) {
		return axiosClient.post(URL + '/change-password', body);
	},
	changeInfor(body: FormChangeInfor) {
		return axiosClient.post(URL + '/change-infor', body);
	},
};

export default authApi;
