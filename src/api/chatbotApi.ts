import axios from 'axios';
import { Intent } from '@/models/chatbotModel';
import { store } from '@/redux/store';

const baseUrl = process.env.PYTHON_API_URL;

const chatbotApi = {
	chat(input: string) {
		const { currentUser } = store.getState().auth;
		return axios.post(baseUrl + 'chatbot', { message: input, user: currentUser?.id });
	},
	getIntents() {
		return axios.get(baseUrl + 'intents/get');
	},
	getIntentById(id: string) {
		return axios.get(baseUrl + 'intents/get-by-id/' + id);
	},
	addIntent(body: Intent) {
		return axios.post(baseUrl + 'intents/add', body);
	},
	editIntent(body: Intent) {
		return axios.put(baseUrl + 'intents/edit/' + body._id, body);
	},
};

export default chatbotApi;
