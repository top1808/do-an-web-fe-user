import { store } from '@/redux/store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import Swal from 'sweetalert2';
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
	headers: AxiosRequestHeaders;
}

const axiosClient = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
	withCredentials: true,
	timeout: 30000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
	async (config: AdaptAxiosRequestConfig) => {
		const { currentUser } = store.getState().auth;
		const { token } = store.getState().notification;
		if (currentUser && currentUser.id) {
			config.headers['userId'] = currentUser.id;
		}
		config.headers.messagingToken = token;
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: AxiosError<AdaptAxiosRequestConfig>) => {
		if (error.code === 'ECONNABORTED') {
			Swal.fire({
				icon: 'error',
				title: 'Có lỗi xảy ra.',
				confirmButtonText: 'Tải lại trang',
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.reload();
				}
			});
		}
		return Promise.reject(error);
	},
);

export default axiosClient;
