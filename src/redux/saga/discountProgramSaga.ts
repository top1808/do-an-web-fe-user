import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { getDiscountProgramsFailed, getDiscountProgramsSuccess, gettingDiscountPrograms } from '../reducers/discountProgramReducer';
import discountProgramApi from '@/api/discountProgramApi';

function* onGetDiscountPrograms() {
	try {
		const response: AxiosResponse = yield call(discountProgramApi.getAll);
		yield put(getDiscountProgramsSuccess(response.data.discountPrograms));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getDiscountProgramsFailed(error.response.data.message));
	}
}

function* watchGetDiscountProgramsFlow() {
	const type: string = gettingDiscountPrograms.type;
	yield takeEvery(type, onGetDiscountPrograms);
}

export function* DiscountProgramSaga() {
	yield fork(watchGetDiscountProgramsFlow);
}
