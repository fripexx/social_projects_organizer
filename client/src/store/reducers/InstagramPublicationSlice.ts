import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {InstagramPostType} from "../types/InstagramPostType";
import {addInstagramPost} from "../thunks/InstagramPostsThunks";

interface InstagramPublicationState {
    isLoading: boolean,
    publication: InstagramPostType | null,
    error: ErrorResponseType | null;
}

const initialState: InstagramPublicationState = {
    isLoading: false,
    publication: null,
    error: null
}

const InstagramPublicationSlice = createSlice({
    name: "instagramPosts",
    initialState,
    reducers: {},
    extraReducers: {
        /* addInstagramPublication */
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

export default InstagramPublicationSlice.reducer;