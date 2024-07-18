import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/PostType";
import {publishInstagramPublication, getInstagramPublication, updateInstagramPublication} from "../thunks/PostThunks";

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

const instagramPublicationSlice = createSlice({
    name: "instagramPublication",
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

        /* updateInstagramPublication */
        [updateInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [updateInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default instagramPublicationSlice.reducer;
export const { setPublication } = instagramPublicationSlice.actions;