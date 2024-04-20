import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
export const modalState = (state: RootState) => state.cart as ModalState;
