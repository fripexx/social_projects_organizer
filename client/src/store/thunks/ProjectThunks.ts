import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../axios/instanceServer";
import {ProjectType} from "../types/ProjectType";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {NoteType} from "../types/NoteType";

export const getProject = createAsyncThunk(
    'project/getProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<ProjectType>(
                `/get-project`,
                {
                    params: {id}
                }
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);
export const editSettingsProject = createAsyncThunk(
    'project/editSettingsProject',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.put<ProjectType>(
                `/edit-settings-project`,
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

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);
export const getNotesProject = createAsyncThunk(
    'project/getNotesProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<NoteType[]>(
                `/get-notes-project`,
                {
                    params: {id}
                },
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);