import {createAsyncThunk} from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType, InstagramReelsType, InstagramStoriesType} from "../types/PostType";
import { GetPostRequestType, GetPostsResponseType,} from "../../api/types/PostServiceTypes";
import {PostsQueryType} from "../types/PostsQueryType";


/**
 * Instagram Publication
 */

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

export const getInstagramPublication = createAsyncThunk<InstagramPublicationType, GetPostRequestType, AsyncThunkConfig>(
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


/**
 * Instagram Reels
 */

export const publishInstagramReels = createAsyncThunk<InstagramReelsType, InstagramReelsType, AsyncThunkConfig>(
    'instagramReels/publishInstagramReels',
    async (data, thunkAPI) => {
        try {
            return await PostService.publishInstagramReels(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramReels = createAsyncThunk<InstagramReelsType, GetPostRequestType, AsyncThunkConfig>(
    'instagramReels/getInstagramReels',
    async (data, thunkAPI) => {
        try {
            return await PostService.getInstagramReels(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const updateInstagramReels = createAsyncThunk<InstagramReelsType, InstagramReelsType, AsyncThunkConfig>(
    'instagramReels/updateInstagramReels',
    async (data, thunkAPI) => {
        try {
            return await PostService.updateInstagramReels(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);


/**
 * Instagram Stories
 */

export const publishInstagramStories = createAsyncThunk<InstagramStoriesType, InstagramStoriesType, AsyncThunkConfig>(
    'instagramStories/publishInstagramStories',
    async (data, thunkAPI) => {
        try {
            return await PostService.publishInstagramStories(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const getInstagramStories = createAsyncThunk<InstagramStoriesType, GetPostRequestType, AsyncThunkConfig>(
    'instagramStories/getInstagramStories',
    async (data, thunkAPI) => {
        try {
            return await PostService.getInstagramStories(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const updateInstagramStories = createAsyncThunk<InstagramStoriesType, InstagramStoriesType, AsyncThunkConfig>(
    'instagramStories/updateInstagramStories',
    async (data, thunkAPI) => {
        try {
            return await PostService.updateInstagramStories(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

/**
 * General
 */

export const getPosts = createAsyncThunk<GetPostsResponseType, PostsQueryType, AsyncThunkConfig>(
    'project/getPosts',
    async (data, thunkAPI) => {
        try {
            return await PostService.getPosts(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);