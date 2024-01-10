import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../types/UserType";
import {AuthResponseType} from "../types/AuthResponseType";
import {checkAuth, login, logout, registration} from "../thunks/UserThunks";


interface UserState {
    user: UserType | null;
    isLoading: boolean;
    isAuth: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    isAuth: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        /* Login */
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload;
            state.isAuth = true;
        },
        [login.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Registration */
        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload;
            state.isAuth = true;
        },
        [registration.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Logout */
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.fulfilled.type]: (state, action: PayloadAction<AuthResponseType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = null;
            state.isAuth = false
        },
        [logout.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Check Auth */
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload;
            state.isAuth = true;
        },
        [checkAuth.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('token');
        },
    }
})

export default userSlice.reducer;
