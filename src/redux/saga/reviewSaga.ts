import reviewApi from '@/api/reviewApi';
import { AxiosResponse } from 'axios';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { getReviewsFailed, getReviewsSuccess, gettingReviews } from '../reducers/reviewReducers';

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

function* watchGetReviewsByUserFlow() {
	yield takeEvery(gettingReviews.type, onGetReviewsByUser);
}

export function* ReviewSaga() {
	yield fork(watchGetReviewsByUserFlow);
}
