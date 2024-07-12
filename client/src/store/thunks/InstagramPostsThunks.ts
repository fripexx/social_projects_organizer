import {createAsyncThunk} from "@reduxjs/toolkit";
import InstagramPostsService from "../../api/services/InstagramPostsService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/InstagramPostType";
import {
    AddInstagramPublicationRequestType,
    GetInstagramPublicationRequestType
} from "../../api/types/InstagramPostsServiceTypes";

export const addInstagramPublication = createAsyncThunk<InstagramPublicationType, AddInstagramPublicationRequestType, AsyncThunkConfig>(
    'instagramPosts/addInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await InstagramPostsService.addInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramPublication = createAsyncThunk<InstagramPublicationType, GetInstagramPublicationRequestType, AsyncThunkConfig>(
    'instagramPosts/getInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await InstagramPostsService.getInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);