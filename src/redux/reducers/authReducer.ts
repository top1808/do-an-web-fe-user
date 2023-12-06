import { FormLogin } from '@/models/authModel';
import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface AuthState {
	isLoggedIn: boolean;
	logging: boolean;
	currentUser?: User | null;
	currentUserInfo?: User | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	logging: false,
	currentUser: null,
	currentUserInfo: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		login(state, action: PayloadAction<FormLogin>) {
			state.logging = true;
			if (action.payload.remember) {
				const user = {
					email: action.payload.email,
					password: action.payload.password,
				};
				localStorage.setItem('accountCustomer', JSON.stringify(user));
			}
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.logging = false;
			state.isLoggedIn = true;
			state.currentUser = action.payload;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.logging = false;
			state.isLoggedIn = false;
			state.currentUser = null;
			toast.error(action.payload);
		},

		logout(state) {
			state.logging = false;
			state.isLoggedIn = false;
			state.currentUser = null;
		},

		gettingInfoCurrentUser(state, action: PayloadAction<string>) {
			state.logging = true;
		},
		getInfoCurrentUserSuccess(state, action: PayloadAction<User>) {
			state.logging = false;
			state.currentUserInfo = action.payload;
		},
		getInfoCurrentUserFailed(state, action: PayloadAction<string>) {
			state.logging = false;
		},
	},
});

export const { login, loginSuccess, loginFailed, logout, getInfoCurrentUserFailed, getInfoCurrentUserSuccess, gettingInfoCurrentUser } = authSlice.actions;
export default authSlice.reducer;
