import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../axios/instanceServer";
import {FileType, PhotoType} from "../types/FileType";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {GetMediaResponseType} from "../types/GetMediaResponseType";

export const uploadMedia = createAsyncThunk(
    'project/uploadMedia',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.post<(FileType | PhotoType)[]>(
                `/upload-media`,
                data
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

export interface QueryMedia {
    projectId: string,
    limit: number,
    skip: number,
    type?: string | string[]
}

export const getMedia = createAsyncThunk(
    'project/getMedia',
    async (data: QueryMedia, thunkAPI) => {
        try {
            const response = await instanceServer.get<GetMediaResponseType>(
                `/get-media`,
                {
                    params: data
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

interface DeleteMediaType {
    idMedia: string,
    projectId: string
}
export const deleteMedia = createAsyncThunk(
    'project/deleteMedia',
    async (data: DeleteMediaType, thunkAPI) => {
        try {
            const response = await instanceServer.delete<FileType | PhotoType>(
                `/delete-media`,
                {
                    params: data
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

