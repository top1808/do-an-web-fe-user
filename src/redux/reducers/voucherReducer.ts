import { ApplyVoucherInfor, ApplyVoucherModel, VoucherModel } from '@/models/voucherModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface VoucherState {
	loading: boolean;
	isApplying: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: VoucherModel[];
	voucherApply?: ApplyVoucherInfor | null;
}

const initialState: VoucherState = {
	loading: false,
	isApplying: false,
	status: 'pending',
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
			state.data = action.payload;
		},
		getVouchersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
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
	},
});
export const { gettingVouchers, getVouchersSuccess, getVouchersFailed, applyVoucherFailed, applyVoucherSuccess, applyingVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
