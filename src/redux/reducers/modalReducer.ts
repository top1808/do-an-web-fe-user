import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
	isOpen?: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

const modalReducer = createSlice({
	name: 'modal',
	initialState: initialState,
	reducers: {
		toggleModal: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});
export const { toggleModal } = modalReducer.actions;
export default modalReducer.reducer;
