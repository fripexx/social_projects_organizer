import {createAsyncThunk} from "@reduxjs/toolkit"
import instanceServer from "../../axios/instanceServer";
import {AuthRequestType} from "../types/AuthRequestType";
import {AuthResponseType} from "../types/AuthResponseType";
import {RegistrationRequestType} from "../types/RegistrationRequestType";
import axios, {isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import * as fs from "fs";
import {FormStateType} from "../../Pages/AccountSettingsPage/types/FormStateType";
export const login = createAsyncThunk(
    'user/login',
    async (obj: AuthRequestType, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/login', obj);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Помилка авторизації"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            return thunkAPI.rejectWithValue(response);
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
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            return thunkAPI.rejectWithValue(response);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>('/logout');
            localStorage.removeItem('token')
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            return thunkAPI.rejectWithValue(response);
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
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            return thunkAPI.rejectWithValue(response);
        }
    }
);

export const sendActivateLink = createAsyncThunk(
    'user/sendActivateLink',
    async (email: string, thunkAPI) => {
        try {
            const response = await instanceServer.post('/send-activate-link', {email});
            return response;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.post<AuthResponseType>(
                '/edit-user',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
            );

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

export const editSettingsUser = createAsyncThunk(
    'user/editSettingsUser',
    async (data: FormStateType, thunkAPI) => {
        try {
            const response = await instanceServer.post<Response>(
                '/edit-settings-user',
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if(isAxiosError(e) && e?.response){
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);