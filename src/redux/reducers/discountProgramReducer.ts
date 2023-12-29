import { DiscountProgram } from '@/models/discountProgramModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface DiscountProgramState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: DiscountProgram[];
}

const initialState: DiscountProgramState = {
	loading: false,
	status: 'pending',
	data: [],
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
			state.data = [];
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getDiscountProgramsFailed, getDiscountProgramsSuccess, gettingDiscountPrograms } = discountProgramSlice.actions;
export default discountProgramSlice.reducer;
