import {createAsyncThunk} from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/PostType";
import {
    AddInstagramPublicationRequestType,
    GetInstagramPublicationRequestType
} from "../../api/types/PostServiceTypes";

export const publishInstagramPublication = createAsyncThunk<InstagramPublicationType, AddInstagramPublicationRequestType, AsyncThunkConfig>(
    'instagramPosts/publishInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await PostService.publishInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramPublication = createAsyncThunk<InstagramPublicationType, GetInstagramPublicationRequestType, AsyncThunkConfig>(
    'instagramPosts/getInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await PostService.getInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);