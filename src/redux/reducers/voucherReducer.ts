import { ApplyVoucherInfor, ApplyVoucherModel, VoucherModel } from '@/models/voucherModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
interface VoucherState {
	loading: boolean;
	isApplying: boolean;
	status: 'init' | 'pending' | 'completed' | 'failed';
	data?: VoucherModel[];
	voucherApply?: ApplyVoucherInfor | null;
}

const initialState: VoucherState = {
	loading: false,
	isApplying: false,
	status: 'init',
	data: [],
	voucherApply: null,
};

const voucherSlice = createSlice({
	name: 'voucher',
	initialState: initialState,
	reducers: {
		gettingVouchers: (state) => {
			state.status = 'pending';
			state.loading = true;
		},
		getVouchersSuccess: (state, action: PayloadAction<VoucherModel[]>) => {
			state.loading = false;
			state.status = 'completed';
			state.data = action.payload;
		},
		getVouchersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		applyingVoucher: (state, action: PayloadAction<ApplyVoucherModel>) => {
			state.isApplying = true;
		},
		applyVoucherSuccess: (state, action: PayloadAction<{ voucher: ApplyVoucherInfor; message: string }>) => {
			state.isApplying = false;
			state.voucherApply = action.payload.voucher;
			toast.success(action.payload.message);
		},
		applyVoucherFailed: (state, action: PayloadAction<string>) => {
			state.isApplying = false;
			action.payload && toast.error(action.payload);
		},
		clearVoucherState: (state) => {
			state.voucherApply = null;
		},
	},
});
export const { gettingVouchers, getVouchersSuccess, getVouchersFailed, applyVoucherFailed, applyVoucherSuccess, applyingVoucher, clearVoucherState } = voucherSlice.actions;
export default voucherSlice.reducer;
export const getVoucherState = (state: RootState) => state.voucher as VoucherState;
