import reviewApi from '@/api/reviewApi';
import { AxiosResponse } from 'axios';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { createReviewFailed, createReviewSuccess, creatingReview, getReviewsFailed, getReviewsSuccess, gettingReviews } from '../reducers/reviewReducers';
import { PayloadAction } from '@reduxjs/toolkit';
import { ReviewBody } from '@/models/reviewModel';

function* onGetReviewsByUser() {
	try {
		const response: AxiosResponse = yield call(reviewApi.getReviewsByUser);
		yield put(getReviewsSuccess(response.data.reviews));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getReviewsFailed(error.response.data.message));
	}
}
function* onCreateReview(action: PayloadAction<ReviewBody>) {
	try {
		const response: AxiosResponse = yield call(reviewApi.createReview, action.payload);
		yield put(createReviewSuccess(response.data.message));
	} catch (error: any) {
		yield put(createReviewFailed('Review failed!'));
	}
}
function* watchGetReviewsByUserFlow() {
	yield takeEvery(gettingReviews.type, onGetReviewsByUser);
}
function* watchCreateReviewsByUserFlow() {
	yield takeEvery(creatingReview.type, onCreateReview);
}
export function* ReviewSaga() {
	yield fork(watchGetReviewsByUserFlow);
	yield fork(watchCreateReviewsByUserFlow);
}
