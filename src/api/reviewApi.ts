import { objectToQueryString } from '@/utils/FunctionHelpers';
import axiosClient from './axiosClient';
import { ReviewBody } from '@/models/reviewModel';

const URL = '/review';

const reviewApi = {
	createReview(body: ReviewBody) {
		return axiosClient.post(URL + '/rate', body);
	},
	getProductReview() {
		return axiosClient.get(URL + '/get-product-without-review');
	},
};

export default reviewApi;
