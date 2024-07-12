import {createAsyncThunk} from "@reduxjs/toolkit";
import ProjectMediaService from "../../api/services/ProjectMediaService";
import {FileType, PhotoType} from "../types/FileType";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {DeleteMediaRequestType, QueryMediaRequestType, GetMediaResponseType} from "../../api/types/ProjectMediaTypes";

export const uploadMedia = createAsyncThunk<(FileType | PhotoType)[], FormData, { rejectValue: ErrorResponseType }>(
    'project/uploadMedia',
    async (data, thunkAPI) => {
        try {
            return await ProjectMediaService.uploadMedia(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getMedia = createAsyncThunk<GetMediaResponseType, QueryMediaRequestType, { rejectValue: ErrorResponseType }>(
    'project/getMedia',
    async (data, thunkAPI) => {
        try {
            return await ProjectMediaService.getMedia(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const deleteMedia = createAsyncThunk<FileType | PhotoType, DeleteMediaRequestType, { rejectValue: ErrorResponseType }>(
    'project/deleteMedia',
    async (data, thunkAPI) => {
        try {
            return await ProjectMediaService.deleteMedia(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

