import { DiscountProgram } from '@/models/discountProgramModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';

interface DiscountProgramState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: DiscountProgram[] | undefined;
}

const initialState: DiscountProgramState = {
	loading: false,
	status: 'pending',
	data: undefined,
};

const discountProgramSlice = createSlice({
	name: 'discountProgram',
	initialState: initialState,
	reducers: {
		gettingDiscountPrograms: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		getDiscountProgramsSuccess: (state, action: PayloadAction<DiscountProgram[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getDiscountProgramsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = undefined;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getDiscountProgramsFailed, getDiscountProgramsSuccess, gettingDiscountPrograms } = discountProgramSlice.actions;
export default discountProgramSlice.reducer;
export const discountProgramState = (state: RootState) => state.discountProgram;
