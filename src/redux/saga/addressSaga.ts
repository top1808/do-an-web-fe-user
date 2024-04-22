import { call, fork, put, takeLatest } from 'redux-saga/effects';
import {
	getDistrictsFail,
	getDistrictsSuccess,
	getFeeDeliverysFailed,
	getFeeDeliverysSuccess,
	getProvincesFail,
	getProvincesSuccess,
	getWardsFail,
	getWardsSuccess,
	gettingDistricts,
	gettingFeeDelivery,
	gettingProvinces,
	gettingWards,
} from '../reducers/addressReducer';
import AddressApi from '@/api/addressApi';
import { AxiosResponse } from 'axios';
import { CreateAction } from '@/models/actionModel';
import { ParamsGetFeeDelivery } from '@/models/paymentModels';

function* onGetProvinces() {
	try {
		const response: AxiosResponse = yield call(AddressApi.getProvinces);
		yield put(getProvincesSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getProvincesFail('Get provinces failed !'));
	}
}
function* onGetWards(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(AddressApi.getWards, { district_id: id });
		yield put(getWardsSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getWardsFail('Get Wards failed !'));
	}
}
function* onGetFeeDelivery(action: CreateAction<any>) {
	try {
		const body: ParamsGetFeeDelivery = action.payload as ParamsGetFeeDelivery;
		const response: AxiosResponse = yield call(AddressApi.getFeeDelivery, body);

		yield put(getFeeDeliverysSuccess(response.data.data.total));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getFeeDeliverysFailed(''));
	}
}
function* onGetDistricts(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(AddressApi.getDistricts, { province_id: id });
		yield put(getDistrictsSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getDistrictsFail('Get Districts failed !'));
	}
}
function* watchGetDistrictsFlow() {
	const type: string = gettingDistricts.type;
	yield takeLatest(type, onGetDistricts);
}
function* watchGetFeeDeliveryFlow() {
	const type: string = gettingFeeDelivery.type;
	yield takeLatest(type, onGetFeeDelivery);
}
function* watchGetProvincesFlow() {
	const type: string = gettingProvinces.type;
	yield takeLatest(type, onGetProvinces);
}
function* watchGetWardsFlow() {
	const type: string = gettingWards.type;
	yield takeLatest(type, onGetWards);
}
export function* AddressSaga() {
	yield fork(watchGetDistrictsFlow);
	yield fork(watchGetProvincesFlow);
	yield fork(watchGetWardsFlow);
	yield fork(watchGetFeeDeliveryFlow);
}
