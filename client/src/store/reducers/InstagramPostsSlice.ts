import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {InstagramPostType} from "../types/InstagramPostType";
import {addInstagramPost} from "../thunks/InstagramPostsThunks";

interface InstagramPostsState {
    isLoading: boolean,
    posts: InstagramPostType[],
    error: ErrorResponseType | null;
}

const initialState: InstagramPostsState = {
    isLoading: false,
    posts: [],
    error: null
}

const InstagramPostsSlice = createSlice({
    name: "instagramPosts",
    initialState,
    reducers: {},
    extraReducers: {
        /* addInstagramPost */
        [addInstagramPost.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addInstagramPost.fulfilled.type]: (state, action: PayloadAction<InstagramPostType>) => {
            state.isLoading = false;
            state.error = null;
            //state.posts = [...state.posts, action.payload]
        },
        [addInstagramPost.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default InstagramPostsSlice.reducer;