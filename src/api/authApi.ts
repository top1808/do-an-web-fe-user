import axiosClient from './axiosClient';
import { FormRegister, FormLogin } from '../models/authModel';

const URL = '/auth';

const authApi = {
	register(body: FormRegister) {
		return axiosClient.post(URL + '/register', body);
	},
	login(body: FormLogin) {
		return axiosClient.post(URL + '/login', body);
	},
	refreshToken() {
		return axiosClient.post(URL + '/refresh', {});
	},
	checkExist(id: string) {
		return axiosClient.get('/customer/' + id);
	},
};

export default authApi;
