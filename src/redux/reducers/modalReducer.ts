import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ModalState {
	isOpen?: boolean;
	isOpenChat?: boolean;
}

const initialState: ModalState = {
	isOpen: false,
	isOpenChat: false,
};

const modalReducer = createSlice({
	name: 'modal',
	initialState: initialState,
	reducers: {
		toggleModal: (state) => {
			state.isOpen = !state.isOpen;
		},
		toggleChat: (state: ModalState) => {
			state.isOpenChat = !state.isOpenChat;
		},
	},
});
export const { toggleModal, toggleChat } = modalReducer.actions;
export const getModalState = (state: RootState) => state.modal;
export default modalReducer.reducer;
