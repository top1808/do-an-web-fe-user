import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { applyVoucherFailed, applyVoucherSuccess, applyingVoucher, getVouchersFailed, getVouchersSuccess, gettingVouchers } from '../reducers/voucherReducer';
import voucherApi from '@/api/voucherApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApplyVoucherModel } from '@/models/voucherModel';

function* onGetVouchers() {
	try {
		const response: AxiosResponse = yield call(voucherApi.getVouchers);
		yield put(getVouchersSuccess(response.data.vouchers));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getVouchersFailed(error.response.data.message));
	}
}
function* onApplyVoucher(action: PayloadAction<ApplyVoucherModel>) {
	try {
		const response: AxiosResponse = yield call(voucherApi.applyVoucher, action.payload);
		yield put(applyVoucherSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(applyVoucherFailed(error.response.data.message));
	}
}

function* watchGetVouchersFlow() {
	yield takeEvery(gettingVouchers.type, onGetVouchers);
}
function* watchApplyVoucherFlow() {
	yield takeEvery(applyingVoucher.type, onApplyVoucher);
}

export function* VoucherSaga() {
	yield fork(watchGetVouchersFlow);
	yield fork(watchApplyVoucherFlow);
}
