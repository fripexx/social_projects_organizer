import {createAsyncThunk} from "@reduxjs/toolkit"
import UserService from "../../api/services/UserService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {
    LoginRequestType,
    RegistrationRequestType,
    ChangeNoteRequestType,
    AddProjectRequestType
} from "../../api/types/UserServiceTypes";
import {NoteType} from "../types/NoteType";
import {ProjectType} from "../types/ProjectType";
import {SettingUser, UserType} from "../types/UserType";

export const login = createAsyncThunk<UserType, LoginRequestType, AsyncThunkConfig>(
    'user/login',
    async (obj, thunkAPI) => {
        try {
            const response = await UserService.login(obj);
            return response.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const registration = createAsyncThunk<UserType, RegistrationRequestType, AsyncThunkConfig>(
    'user/registration',
    async (obj, thunkAPI) => {
        try {
            return await UserService.registration(obj);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            return await UserService.logout();
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const checkAuth = createAsyncThunk<UserType, void, AsyncThunkConfig>(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.checkAuth();
            return response.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const sendActivateLink = createAsyncThunk<void, string, AsyncThunkConfig>(
    'user/sendActivateLink',
    async (email, thunkAPI) => {
        try {
            await UserService.sendActivateLink(email);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const editUser = createAsyncThunk<UserType, FormData, AsyncThunkConfig>(
    'user/editUser',
    async (data, thunkAPI) => {
        try {
            return await UserService.editUser(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const editSettingsUser = createAsyncThunk<UserType, SettingUser, AsyncThunkConfig>(
    'user/editSettingsUser',
    async (data, thunkAPI) => {
        try {
            return await UserService.editSettingsUser(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const addNoteUser = createAsyncThunk<NoteType, string, AsyncThunkConfig>(
    'user/addNoteUser',
    async (text, thunkAPI) => {
        try {
            return await UserService.addNoteUser(text);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const deleteNoteUser = createAsyncThunk<NoteType, string, AsyncThunkConfig>(
    'user/deleteNoteUser',
    async (id, thunkAPI) => {
        try {
            return await UserService.deleteNoteUser(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getNotesUser = createAsyncThunk<NoteType[], void, AsyncThunkConfig>(
    'user/getNotesUser',
    async (_, thunkAPI) => {
        try {
            return await UserService.getNotesUser();
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const changeNoteUser = createAsyncThunk<NoteType, ChangeNoteRequestType, AsyncThunkConfig>(
    'user/changeNoteUser',
    async (data, thunkAPI) => {
        try {
            return await UserService.changeNoteUser(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const addProject = createAsyncThunk<ProjectType, AddProjectRequestType, AsyncThunkConfig>(
    'user/addProject',
    async (data, thunkAPI) => {
        try {
            return await UserService.addProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getProjects = createAsyncThunk<ProjectType[], void, AsyncThunkConfig>(
    'user/getProjects',
    async (_, thunkAPI) => {
        try {
            return await UserService.getProjects();
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);