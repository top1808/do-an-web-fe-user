import { Address, ParamsGetFeeDelivery } from '@/models/paymentModels';
import { revertDataAddressFromResponse } from '@/utils/FunctionHelpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface AddressState {
	provinces: Address[];
	districts: Address[];
	wards: Address[];
	loading: boolean;
	fee: number;
}
const initialState: AddressState = {
	loading: false,
	districts: [],
	wards: [],
	provinces: [],
	fee: 0,
};
const addressSlice = createSlice({
	name: 'delivery address',
	initialState: initialState,
	reducers: {
		gettingProvinces: (state) => {
			state.loading = true;
		},
		gettingDistricts: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		gettingWards: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		getProvincesSuccess: (state, action) => {
			state.loading = false;
			state.provinces = [...revertDataAddressFromResponse(action.payload, 'provinces')];
			state.districts = initialState.districts;
			state.wards = initialState.wards;
		},
		getDistrictsSuccess: (state, action) => {
			state.loading = false;
			state.districts = [...revertDataAddressFromResponse(action.payload, 'districts')];
			state.wards = initialState.wards;
		},
		getWardsSuccess: (state, action) => {
			state.loading = false;
			state.wards = [...revertDataAddressFromResponse(action.payload, 'wards')];
		},
		getProvincesFail: (state, action) => {
			state.loading = false;
			toast(action.payload);
		},
		getDistrictsFail: (state, action) => {
			state.loading = false;
			toast(action.payload);
		},
		getWardsFail: (state, action) => {
			state.loading = false;
			toast(action.payload);
		},
		gettingFeeDelivery: (state, action: PayloadAction<ParamsGetFeeDelivery>) => {
			state.loading = true;
		},
		getFeeDeliverysSuccess: (state, action) => {
			state.loading = false;
			state.fee = action.payload;
		},
		getFeeDeliverysFailed: (state, action) => {
			state.loading = false;
			state.fee = 0;
			toast.error('Get Fee Failed');
		},
	},
});
export const {
	gettingDistricts,
	gettingProvinces,
	gettingWards,
	getDistrictsFail,
	getDistrictsSuccess,
	getProvincesFail,
	getProvincesSuccess,
	getWardsFail,
	getWardsSuccess,
	getFeeDeliverysFailed,
	getFeeDeliverysSuccess,
	gettingFeeDelivery,
} = addressSlice.actions;
export default addressSlice.reducer;
