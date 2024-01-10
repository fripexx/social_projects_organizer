import {createAsyncThunk} from "@reduxjs/toolkit"
import instanceServer from "../../axios/instanceServer";
import {AuthRequestType} from "../types/AuthRequestType";
import {AuthResponseType} from "../types/AuthResponseType";
import {RegistrationRequestType} from "../types/RegistrationRequestType";
import axios, {isAxiosError} from "axios";
export const login = createAsyncThunk(
    'user/login',
    async (obj: AuthRequestType, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/login', obj);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (e) {
            if(isAxiosError(e)) return thunkAPI.rejectWithValue(e?.response?.data.message);
            return thunkAPI.rejectWithValue("Помилка авторизації");
        }
    }
);

export const registration = createAsyncThunk(
    'user/registration',
    async (obj: RegistrationRequestType, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/registration', obj);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (e) {
            if(isAxiosError(e)) return thunkAPI.rejectWithValue(e?.response?.data.message);
            return thunkAPI.rejectWithValue('Непередбачена помилка');
        }
    }
);

export const logout = createAsyncThunk(
    'user/registration',
    async (_, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/logout');
            localStorage.removeItem('token')
            return response.data;
        } catch (e) {
            if(isAxiosError(e)) return thunkAPI.rejectWithValue(e?.response?.data.message);
            return thunkAPI.rejectWithValue('Непередбачена помилка');
        }
    }
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponseType>(`${process.env.REACT_APP_API_URL}/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (e) {
            if(isAxiosError(e)) return thunkAPI.rejectWithValue(e?.response?.data.message);
            return thunkAPI.rejectWithValue('Непередбачена помилка');
        }
    }
);