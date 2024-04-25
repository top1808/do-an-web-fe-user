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
	getReviewByProductId(id: string) {
		return axiosClient.get(URL + '/get-by-product/' + id);
	},
};
export default reviewApi;
