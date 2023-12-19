import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
	isOpen?: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

const voucherSlice = createSlice({
	name: 'voucher',
	initialState: initialState,
	reducers: {
		toggleModal: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});
export const { toggleModal } = voucherSlice.actions;
export default voucherSlice.reducer;
