import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../types/UserType";
import {login, registration} from "../thunks/UserThunks";
import {AuthResponseType} from "../types/AuthResponseType";
import {debug} from "util";

interface UserState {
    user: UserType | null;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
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
        [login.fulfilled.type]: (state, action: PayloadAction<AuthResponseType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload.user;
        },
        [login.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Registration */
        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<AuthResponseType>) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload.user;
        },
        [registration.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            debugger
        },

    }
})

export default userSlice.reducer;
