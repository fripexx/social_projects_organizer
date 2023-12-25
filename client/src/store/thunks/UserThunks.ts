import {createAsyncThunk} from "@reduxjs/toolkit"
import {instanceServer} from "../../axios/instanceServer";
import {AuthRequestType} from "../types/AuthRequestType";
import {AuthResponseType} from "../types/AuthResponseType";
import {RegistrationRequestType} from "../types/RegistrationRequestType";
import {isAxiosError} from "axios";
export const login = createAsyncThunk(
    'user/login',
    async (obj: AuthRequestType, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/login', obj);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Помилка авторизації");
        }
    }
);

export const registration = createAsyncThunk(
    'user/registration',
    async (obj: RegistrationRequestType, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/registration', obj);
            return response.data;
        } catch (e) {
            if(isAxiosError(e)) return thunkAPI.rejectWithValue(e?.response?.data.message);
            return thunkAPI.rejectWithValue('Непередбачена помилка');
        }
    }
);