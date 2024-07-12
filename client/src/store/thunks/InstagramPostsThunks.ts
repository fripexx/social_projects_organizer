import {createAsyncThunk} from "@reduxjs/toolkit";
import InstagramPostsService from "../../api/services/InstagramPostsService";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/InstagramPostType";
import {
    AddInstagramPublicationRequestType,
    GetInstagramPublicationRequestType
} from "../../api/types/InstagramPostsServiceTypes";

export const addInstagramPublication = createAsyncThunk<InstagramPublicationType, AddInstagramPublicationRequestType, { rejectValue: ErrorResponseType }>(
    'instagramPosts/addInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await InstagramPostsService.addInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramPublication = createAsyncThunk<InstagramPublicationType, GetInstagramPublicationRequestType, { rejectValue: ErrorResponseType }>(
    'instagramPosts/getInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await InstagramPostsService.getInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);