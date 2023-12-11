import { fork, put, call, takeEvery } from 'redux-saga/effects';
import CategoryApi from '@/api/categoryApi';
import { AxiosResponse } from 'axios';
import { getCategorieSuccess, getCategoriesFailed, gettingCategory } from '../reducers/categoryReducer';
function* onGetCategories() {
	try {
		const response: AxiosResponse = yield call(CategoryApi.getCategories);
		yield put(getCategorieSuccess(response.data.categories));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getCategoriesFailed(error.response.data.message));
	}
}

function* watchGetCategoryFlow() {
	yield takeEvery(gettingCategory.type, onGetCategories);
}

export function* CategorySaga() {
	yield fork(watchGetCategoryFlow);
}
