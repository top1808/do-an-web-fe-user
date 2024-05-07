import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import {
	cancelOrderFailed,
	cancelOrderSuccess,
	cancelingOrder,
	confirmOrderFailed,
	confirmOrderSuccess,
	confirmingOrder,
	getOrderInfoFailed,
	getOrderInfoSuccess,
	getOrdersFailed,
	getOrdersSuccess,
	gettingOrderInfo,
	gettingOrders,
} from '../reducers/orderReducer';
import { OrderParams } from '@/models/paymentModels';
import orderApi from '@/api/orderApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* onGetOrders(action: PayloadAction<OrderParams>) {
	try {
		const params: OrderParams = action.payload as OrderParams;
		const response: AxiosResponse = yield call(orderApi.getAll, params);
		yield put(getOrdersSuccess(response.data.orders));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getOrdersFailed(error.response.data.message));
	}
}

function* onGetOrderInfo(action: PayloadAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(orderApi.getById, id);
		yield put(getOrderInfoSuccess(response.data.order));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getOrderInfoFailed(error.response.data.message));
	}
}

function* onCancelOrder(action: PayloadAction<{ id: string; reason: string; receivedDate: string }>) {
	try {
		const response: AxiosResponse = yield call(orderApi.cancelOrder, action.payload);
		yield put(cancelOrderSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(cancelOrderFailed(error.response.data.message));
	}
}

function* onConfirmReceivedOrder(action: PayloadAction<string>) {
	try {
		const response: AxiosResponse = yield call(orderApi.confirmReceivedOrder, action.payload);
		yield put(confirmOrderSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(confirmOrderFailed(error.response.data.message));
	}
}

function* watchGetOrdersFlow() {
	const type: string = gettingOrders.type;
	yield takeEvery(type, onGetOrders);
}

function* watchGetOrderFlow() {
	const type: string = gettingOrderInfo.type;
	yield takeEvery(type, onGetOrderInfo);
}

function* watchCancelOrderFlow() {
	const type: string = cancelingOrder.type;
	yield takeEvery(type, onCancelOrder);
}

function* watchConfirmReceivedOrderFlow() {
	const type: string = confirmingOrder.type;
	yield takeEvery(type, onConfirmReceivedOrder);
}

export function* orderSaga() {
	yield fork(watchGetOrdersFlow);
	yield fork(watchGetOrderFlow);
	yield fork(watchCancelOrderFlow);
	yield fork(watchConfirmReceivedOrderFlow);
}
