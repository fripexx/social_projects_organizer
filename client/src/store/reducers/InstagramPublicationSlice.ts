import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {InstagramPublicationType} from "../types/InstagramPostType";
import {addInstagramPublication} from "../thunks/InstagramPostsThunks";

interface InstagramPublicationState {
    isLoading: boolean,
    publication: InstagramPublicationType | null,
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
        [addInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [addInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default InstagramPublicationSlice.reducer;