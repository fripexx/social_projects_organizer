import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../types/UserType";
import {AuthResponseType} from "../types/AuthResponseType";
import {
    checkAuth,
    editSettingsUser,
    editUser,
    login,
    logout,
    registration,
    sendActivateLink
} from "../thunks/UserThunks";
import {ErrorResponseType} from "../types/ErrorResponseType";


interface UserState {
    user: UserType | null;
    isLoading: boolean;
    isAuth: boolean;
    error: ErrorResponseType | null;
    shouldRedirectToProjectsPage: boolean;
    shouldRedirectToLoginPage: boolean;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    isAuth: false,
    error: null,
    shouldRedirectToProjectsPage: false,
    shouldRedirectToLoginPage: false,
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
            state.error = null;
            state.user = action.payload;
            state.isAuth = true;
            state.shouldRedirectToProjectsPage = true;
        },
        [login.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Registration */
        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            //state.user = action.payload;
            state.isAuth = true;
            state.shouldRedirectToLoginPage = true;
        },
        [registration.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Logout */
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.fulfilled.type]: (state, action: PayloadAction<AuthResponseType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = null;
            state.isAuth = false
            state.shouldRedirectToProjectsPage = false;
            state.shouldRedirectToLoginPage = false;
        },
        [logout.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Check Auth */
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
            state.isAuth = true;
        },
        [checkAuth.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('token');
            state.error = action.payload;
        },

        /* Check Auth */
        [sendActivateLink.pending.type]: (state) => {
            state.isLoading = true;
        },
        [sendActivateLink.fulfilled.type]: (state, action: PayloadAction) => {
            state.isLoading = false;
            state.error = null;
        },
        [sendActivateLink.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Edit User */
        [editUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editUser.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
        },
        [editUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Edit Settings User */
        [editSettingsUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editSettingsUser.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
        },
        [editSettingsUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;
