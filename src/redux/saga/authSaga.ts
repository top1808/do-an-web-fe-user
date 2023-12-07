import { FormLogin } from '@/models/authModel';
import { fork, put, take, select, call, takeEvery } from 'redux-saga/effects';
import { getInfoCurrentUserFailed, getInfoCurrentUserSuccess, gettingInfoCurrentUser, login, loginFailed, loginSuccess, logout } from '../reducers/authReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import authApi from '@/api/authApi';
import { AxiosResponse } from 'axios';

function* handleLogin(body: FormLogin) {
	try {
		const response: AxiosResponse = yield call(authApi.login, body);
		yield put(loginSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(loginFailed(error?.response?.data?.message || 'Error Network!'));
	}
}

function* handleLogout() {
	yield put(logout());
}

function* onGetCustomerInfo(action: PayloadAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(authApi.getById, id);
		yield put(getInfoCurrentUserSuccess(response.data.customer));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getInfoCurrentUserFailed(error.response.data.message));
	}
}

function* watchLoginFlow() {
	yield take(REHYDRATE);
	while (true) {
		const { auth } = yield select((state) => state);
		const isLoggedIn = auth.isLoggedIn;
		if (!isLoggedIn) {
			const action: PayloadAction<FormLogin> = yield take(login.type);
			yield fork(handleLogin, action.payload);
		} else {
			yield take(logout.type);
			yield call(handleLogout);
		}
	}
}

function* watchGetCurrentUserInfoFlow() {
	const type: string = gettingInfoCurrentUser.type;
	yield takeEvery(type, onGetCustomerInfo);
}

export function* authSaga() {
	yield fork(watchLoginFlow);
	yield fork(watchGetCurrentUserInfoFlow);
}
