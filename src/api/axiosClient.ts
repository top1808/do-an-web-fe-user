import { store } from '@/redux/store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import authApi from './authApi';
import { toast } from 'react-toastify';
import { User } from '@/models/userModel';
import { loginSuccess, logout } from '@/redux/reducers/authReducer';
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
	timeout: 15000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
	async (config: AdaptAxiosRequestConfig) => {
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
		return Promise.reject(error);
	},
);

export default axiosClient;
