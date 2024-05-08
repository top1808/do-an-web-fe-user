import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { Review, ReviewBody } from '@/models/reviewModel';
interface ReviewState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Review[];
	isReviewStatus?: 'pending' | 'completed' | 'failed';
	ownReview?: Review[];
}

const initialState: ReviewState = {
	loading: false,
	status: 'pending',
	data: [],
};

const reviewSlice = createSlice({
	name: 'review',
	initialState: initialState,
	reducers: {
		gettingReviews: (state) => {
			state.status = 'pending';
			state.loading = true;
		},
		getReviewsSuccess: (state, action: PayloadAction<Review[] | []>) => {
			state.loading = false;
			state.status = 'completed';
			state.data = action.payload;
		},
		getReviewsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			state.status = 'failed';

			action.payload && toast.error(action.payload);
		},
		creatingReview: (state, action: PayloadAction<ReviewBody>) => {
			state.loading = true;
			state.isReviewStatus = 'pending';
		},
		createReviewSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.isReviewStatus = 'completed';
			toast.success(action.payload);
		},
		createReviewFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
			state.isReviewStatus = 'failed';
		},
	},
});
export const { getReviewsFailed, getReviewsSuccess, gettingReviews, creatingReview, createReviewFailed, createReviewSuccess } = reviewSlice.actions;
export default reviewSlice.reducer;
export const getReviewState = (state: RootState) => state.review as ReviewState;
