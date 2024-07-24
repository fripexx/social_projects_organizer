import {createAsyncThunk} from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/PostType";
import {
    GetInstagramPublicationRequestType,
    GetPostsRequestType,
    GetPostsResponseType,
} from "../../api/types/PostServiceTypes";

export const publishInstagramPublication = createAsyncThunk<InstagramPublicationType, InstagramPublicationType, AsyncThunkConfig>(
    'instagramPublication/publishInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await PostService.publishInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramPublication = createAsyncThunk<InstagramPublicationType, GetInstagramPublicationRequestType, AsyncThunkConfig>(
    'instagramPublication/getInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await PostService.getInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const updateInstagramPublication = createAsyncThunk<InstagramPublicationType, InstagramPublicationType, AsyncThunkConfig>(
    'instagramPublication/updateInstagramPublication',
    async (data, thunkAPI) => {
        try {
            return await PostService.updateInstagramPublication(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getPosts = createAsyncThunk<GetPostsResponseType, GetPostsRequestType, AsyncThunkConfig>(
    'project/getPosts',
    async (data, thunkAPI) => {
        try {
            return await PostService.getPosts(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);