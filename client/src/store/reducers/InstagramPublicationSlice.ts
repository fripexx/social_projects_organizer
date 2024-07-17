import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/PostType";
import {publishInstagramPublication, getInstagramPublication} from "../thunks/PostThunks";

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
    reducers: {
        setPublication: (state, action: PayloadAction<InstagramPublicationType | null>) => {
            state.publication = action.payload;
        },
    },
    extraReducers: {
        /* publishInstagramPublication */
        [publishInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [publishInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [publishInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* getInstagramPublication */
        [getInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [getInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default InstagramPublicationSlice.reducer;
export const { setPublication } = InstagramPublicationSlice.actions;